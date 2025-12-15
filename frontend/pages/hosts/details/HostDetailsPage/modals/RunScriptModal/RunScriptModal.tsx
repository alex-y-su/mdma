import React, { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import { IHostScript } from "interfaces/script";
import { IUser } from "interfaces/user";
import { IHostScriptsResponse } from "services/entities/scripts";

import Button from "components/buttons/Button";
import DataError from "components/DataError/DataError";
import EmptyTable from "components/EmptyTable";
import Modal from "components/Modal";
import Spinner from "components/Spinner/Spinner";

import TableContainer, {
  ITableQueryData,
} from "components/TableContainer/TableContainer";

import { generateTableColumnConfigs } from "./ScriptsTableConfig";

const baseClass = "run-script-modal";

interface IRunScriptModalProps {
  currentUser: IUser | null;
  hostTeamId: number | null;
  onClose: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hostScriptResponse?: IHostScriptsResponse;
  isFetchingHostScripts: boolean;
  isLoadingHostScripts: boolean;
  isError: boolean;
  onClickViewScript: (scriptDetails: IHostScript) => void;
  onClickRunDetails: (scriptExecutionId: string) => void;
  onClickRun: (script: IHostScript) => void;
  isRunningScript: boolean;
  isHidden: boolean;
}

const EmptyComponent = () => <></>;

const RunScriptModal = ({
  currentUser,
  hostTeamId,
  onClose,
  page,
  setPage,
  hostScriptResponse,
  isFetchingHostScripts,
  isLoadingHostScripts,
  isError,
  onClickViewScript,
  onClickRunDetails,
  onClickRun,
  isRunningScript,
  isHidden = false,
}: IRunScriptModalProps) => {
  const { t } = useTranslation("hosts");
  const { config } = useContext(AppContext);

  const onSelectAction = useCallback(
    async (action: string, script: IHostScript) => {
      switch (action) {
        case "showRunDetails": {
          script.last_execution?.execution_id &&
            onClickRunDetails(script.last_execution?.execution_id);
          break;
        }
        case "run": {
          onClickRun(script);
          break;
        }
        default: // do nothing
      }
    },
    [onClickRun, onClickRunDetails]
  );

  const onQueryChange = useCallback(({ pageIndex }: ITableQueryData) => {
    setPage(pageIndex);
  }, []);

  const scriptColumnConfigs = useMemo(
    () =>
      generateTableColumnConfigs(
        currentUser,
        hostTeamId,
        !!config?.server_settings?.scripts_disabled,
        onClickViewScript,
        onSelectAction
      ),
    [
      currentUser,
      hostTeamId,
      config?.server_settings?.scripts_disabled,
      onClickViewScript,
      onSelectAction,
    ]
  );

  if (!config) return null;

  const tableData = hostScriptResponse?.scripts;

  return (
    <Modal
      title={t("modals.runScript.title")}
      onExit={onClose}
      onEnter={onClose}
      className={`${baseClass}`}
      isLoading={isFetchingHostScripts || isLoadingHostScripts}
      isHidden={isHidden}
    >
      <>
        <div className={`${baseClass}__modal-content`}>
          {isLoadingHostScripts && <Spinner />}
          {!isLoadingHostScripts && isError && <DataError />}
          {!isLoadingHostScripts &&
            !isError &&
            (!tableData || tableData.length === 0) && (
              <EmptyTable
                header={t("modals.runScript.noScriptsHeader")}
                info={t("modals.runScript.noScriptsInfo")}
              />
            )}
          {!isLoadingHostScripts &&
            !isError &&
            tableData &&
            tableData.length > 0 && (
              <TableContainer
                resultsTitle=""
                emptyComponent={EmptyComponent}
                showMarkAllPages={false}
                isAllPagesSelected={false}
                columnConfigs={scriptColumnConfigs}
                data={tableData}
                isLoading={isRunningScript || isFetchingHostScripts}
                onQueryChange={onQueryChange}
                disableNextPage={!hostScriptResponse?.meta.has_next_results}
                pageIndex={page}
                pageSize={10}
                disableCount
                disableTableHeader
              />
            )}
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onClose}>{t("modals.runScript.done")}</Button>
        </div>
      </>
    </Modal>
  );
};

export default React.memo(RunScriptModal);
