import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import scriptsAPI, { IScriptResultResponse } from "services/entities/scripts";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";
import IconStatusMessage from "components/IconStatusMessage";
import Textarea from "components/Textarea";
import DataError from "components/DataError/DataError";
import Spinner from "components/Spinner/Spinner";
import ModalFooter from "components/ModalFooter";

const baseClass = "run-script-details-modal";

interface IScriptContentProps {
  content: string;
}

const ScriptContent = ({ content }: IScriptContentProps) => {
  const { t } = useTranslation("dashboard");
  return (
    <Textarea label={t("activityDetails.runScriptModal.scriptContent")} variant="code">
      {content}
    </Textarea>
  );
};

const StatusMessageRunning = () => {
  const { t } = useTranslation("dashboard");
  return (
    <IconStatusMessage
      className={`${baseClass}__status-message`}
      iconName="pending-outline"
      message={t("activityDetails.runScriptModal.statusRunning")}
    />
  );
};

const StatusMessageSuccess = () => {
  const { t } = useTranslation("dashboard");
  return (
    <IconStatusMessage
      className={`${baseClass}__status-message`}
      iconName="success-outline"
      message={t("activityDetails.runScriptModal.statusSuccess")}
    />
  );
};

const StatusMessageFailed = ({ exitCode }: { exitCode: number }) => {
  const { t } = useTranslation("dashboard");
  return (
    <IconStatusMessage
      className={`${baseClass}__status-message`}
      iconName="error-outline"
      message={t("activityDetails.runScriptModal.statusFailed", { exitCode })}
    />
  );
};

const StatusMessageError = ({ message }: { message: React.ReactNode }) => {
  const { t } = useTranslation("dashboard");
  return (
    <IconStatusMessage
      className={`${baseClass}__status-message`}
      iconName="error-outline"
      message={<>{t("activityDetails.runScriptModal.statusError", { message })}</>}
    />
  );
};

interface IStatusMessageProps {
  hostTimeout: boolean;
  exitCode: number | null;
  message: string;
}

const StatusMessage = ({
  hostTimeout,
  exitCode,
  message,
}: IStatusMessageProps) => {
  const { t } = useTranslation("dashboard");

  switch (exitCode) {
    case null:
      return !hostTimeout ? (
        // Expected API message: "A script is already running on this host. Please wait about 1 minute to let it finish."
        <StatusMessageRunning />
      ) : (
        // Expected API message: "Fleet hasn't heard from the host in over 1 minute. Fleet doesn't know if the script ran because the host went offline."
        <StatusMessageError message={message} />
      );
    case -2:
      // Expected API message: "Scripts are disabled for this host. To run scripts, deploy the fleetd agent with scripts enabled."
      return <StatusMessageError message={message} />;
    case -1: {
      // message should look like: "Timeout. Fleet stopped the script after 600 seconds to protect host performance.";
      const timeOutValue = message.match(/(\d+\s(?:seconds))/);

      // should always be there, but handle cleanly if not
      const varText = timeOutValue ? (
        <>
          {t("activityDetails.runScriptModal.after")}{" "}
          <TooltipWrapper tipContent={t("activityDetails.runScriptModal.timeoutTooltip")}>
            {timeOutValue[0]}
          </TooltipWrapper>{" "}
        </>
      ) : null;

      const modMessage = (
        <>
          {t("activityDetails.runScriptModal.timeout", { timeoutValue: varText })}
        </>
      );
      return <StatusMessageError message={modMessage} />;
    }
    case 0:
      // Expected API message: ""
      return <StatusMessageSuccess />;
    default:
      // Expected API message: ""
      return <StatusMessageFailed exitCode={exitCode} />;
  }
};

interface IScriptOutputProps {
  output: string;
  hostname: string;
  wasAdHoc: boolean;
}

const ScriptOutput = ({
  output,
  hostname,
  wasAdHoc = false,
}: IScriptOutputProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className={`${baseClass}__script-result`}>
      <Textarea
        label={
          <>
            {t("activityDetails.runScriptModal.outputLabel", {
              outputRecorded: (
                <TooltipWrapper
                  tipContent={t("activityDetails.runScriptModal.outputTooltip")}
                  tooltipClass={`${baseClass}__output-tooltip`}
                  delayInMs={500}
                >
                  {t("activityDetails.runScriptModal.outputRecorded")}
                </TooltipWrapper>
              ),
              hostname: <b>{hostname}</b>,
              wasAdHoc: wasAdHoc ? t("activityDetails.runScriptModal.above") : "",
            })}
          </>
        }
        variant="code"
      >
        {output}
      </Textarea>
    </div>
  );
};
interface IRunScriptDetailsModalProps {
  scriptExecutionId: string;
  onCancel: () => void;
  isHidden?: boolean;
}

const RunScriptDetailsModal = ({
  scriptExecutionId,
  onCancel,
  isHidden = false,
}: IRunScriptDetailsModalProps) => {
  const { t } = useTranslation("dashboard");

  // For scrollable modal
  const [isTopScrolling, setIsTopScrolling] = useState(false);
  const topDivRef = useRef<HTMLDivElement>(null);
  const checkScroll = () => {
    if (topDivRef.current) {
      const isScrolling =
        topDivRef.current.scrollHeight > topDivRef.current.clientHeight;
      setIsTopScrolling(isScrolling);
    }
  };

  const { data, isLoading, isError } = useQuery<IScriptResultResponse>(
    ["runScriptDetailsModal", scriptExecutionId],
    () => {
      return scriptsAPI.getScriptResult(scriptExecutionId);
    },
    { refetchOnWindowFocus: false, enabled: !!scriptExecutionId }
  );

  // For scrollable modal
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [data]); // Re-run when data changes

  const renderContent = () => {
    let content = <></>;

    if (isLoading) {
      content = <Spinner />;
    } else if (isError) {
      content = <DataError description={t("activityDetails.runScriptModal.dataError")} />;
    } else if (data) {
      const hostTimedOut =
        data.exit_code === null && data.host_timeout === true;
      const scriptsDisabledForHost = data.exit_code === -2;
      const scriptStillRunning =
        data.exit_code === null && data.host_timeout === false;
      const showOutputText =
        !hostTimedOut && !scriptsDisabledForHost && !scriptStillRunning;
      const ranAdHocScript = data.script_id === null;

      content = (
        <>
          <StatusMessage
            hostTimeout={data.host_timeout}
            exitCode={data.exit_code}
            message={data.output}
          />
          {ranAdHocScript && <ScriptContent content={data.script_contents} />}
          {showOutputText && (
            <ScriptOutput
              hostname={data.hostname}
              output={data.output}
              wasAdHoc={ranAdHocScript}
            />
          )}
        </>
      );
    }

    return (
      <div
        className={`${baseClass}__modal-content modal-scrollable-content`}
        ref={topDivRef}
      >
        {content}
      </div>
    );
  };

  const renderFooter = () => (
    <ModalFooter
      isTopScrolling={isTopScrolling}
      primaryButtons={<Button onClick={onCancel}>{t("activityDetails.runScriptModal.done")}</Button>}
    />
  );
  return (
    <Modal
      title={t("activityDetails.runScriptModal.title")}
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
      isHidden={isHidden}
    >
      <>
        {renderContent()}
        {renderFooter()}
      </>
    </Modal>
  );
};

export default RunScriptDetailsModal;
