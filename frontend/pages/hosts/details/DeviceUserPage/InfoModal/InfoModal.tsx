import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Modal from "components/Modal";
import CustomLink from "components/CustomLink";

export interface IInfoModalProps {
  onCancel: () => void;
}

const baseClass = "device-user-info";

const InfoModal = ({ onCancel }: IInfoModalProps): JSX.Element => {
  const { t } = useTranslation("hosts");
  return (
    <Modal
      title={t("deviceUser.infoModal.title")}
      onExit={onCancel}
      className={`${baseClass}__modal`}
    >
      <div>
        <p>
          {t("deviceUser.infoModal.paragraph1")}
        </p>
        <p>{t("deviceUser.infoModal.paragraph2")}</p>
        <p>
          {t("deviceUser.infoModal.transparencyPrompt")}&nbsp;
          <CustomLink
            url="https://fleetdm.com/transparency"
            text={t("deviceUser.infoModal.transparencyLink")}
            newTab
            multiline
          />
        </p>
        <div className="modal-cta-wrap">
          <Button type="button" onClick={onCancel}>
            {t("deviceUser.infoModal.ok")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
