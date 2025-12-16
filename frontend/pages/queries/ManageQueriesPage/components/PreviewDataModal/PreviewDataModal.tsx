/* This component is used for creating and editing both global and team scheduled queries */

import React from "react";
import { useTranslation } from "react-i18next";
import { syntaxHighlight } from "utilities/helpers";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

const baseClass = "preview-data-modal";

interface IPreviewDataModalProps {
  onCancel: () => void;
}

const PreviewDataModal = ({
  onCancel,
}: IPreviewDataModalProps): JSX.Element => {
  const { t } = useTranslation("queries");
  const json = {
    action: "snapshot",
    snapshot: [
      {
        remote_address: "0.0.0.0",
        remote_port: "0",
        cmdline: "/usr/sbin/syslogd",
      },
    ],
    name: "xxxxxxx",
    hostIdentifier: "xxxxxxx",
    calendarTime: "xxx xxx  x xx:xx:xx xxxx UTC",
    unixTime: "xxxxxxxxx",
    epoch: "xxxxxxxxx",
    counter: "x",
    numerics: "x",
  };

  return (
    <Modal
      title={t("modals.previewData.title")}
      onExit={onCancel}
      className={baseClass}
    >
      <div className={`${baseClass}__preview-modal`}>
        <p>
          <TooltipWrapper tipContent={t("modals.previewData.snapshotTooltip")}>
            {t("modals.previewData.description")}
          </TooltipWrapper>
        </p>
        <div className={`${baseClass}__host-status-webhook-preview`}>
          <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }} />
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onCancel}>{t("modals.previewData.done")}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewDataModal;
