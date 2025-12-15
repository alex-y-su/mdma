import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "confirm-run-script-modal";

interface IConfirmRunScriptModal {
  onCancel: () => void;
  onClose: () => void;
  onConfirmRunScript: () => void;
  scriptName?: string;
  hostName: string;
  isRunningScript: boolean;
  isHidden: boolean;
}

const ConfirmRunScriptModal = ({
  onCancel,
  onClose,
  onConfirmRunScript,
  scriptName,
  hostName,
  isRunningScript,
  isHidden,
}: IConfirmRunScriptModal) => {
  const { t } = useTranslation("hosts");

  return (
    <Modal
      title={t("modals.confirmRunScript.title")}
      onExit={onClose}
      isLoading={isRunningScript}
      isHidden={isHidden}
    >
      <form className={`${baseClass}__form`}>
        <p>
          {t("modals.confirmRunScript.message", {
            scriptName: scriptName || t("modals.confirmRunScript.defaultScriptName"),
            hostName,
          })}
        </p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onConfirmRunScript}
            className="save-loading"
            isLoading={isRunningScript}
          >
            {t("modals.confirmRunScript.run")}
          </Button>
          <Button onClick={onCancel} variant="inverse">
            {t("modals.confirmRunScript.cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmRunScriptModal;
