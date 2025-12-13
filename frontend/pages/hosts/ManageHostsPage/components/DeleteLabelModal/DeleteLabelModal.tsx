import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-label-modal";

interface IDeleteLabelModalProps {
  onSubmit: () => void;
  onCancel: () => void;
  isUpdatingLabel: boolean;
}

const DeleteLabelModal = ({
  onSubmit,
  onCancel,
  isUpdatingLabel,
}: IDeleteLabelModalProps): JSX.Element => {
  const { t } = useTranslation();
  const { isPremiumTier } = useContext(AppContext);
  return (
    <Modal
      title={t("labels:deleteLabel.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <>
        <p>{t("labels:deleteLabel.confirm")}</p>
        {isPremiumTier && (
          <ul>
            <li>{t("labels:deleteLabel.profilesWarning")}</li>
            <li>{t("labels:deleteLabel.queriesWarning")}</li>
          </ul>
        )}
        <div className="modal-cta-wrap">
          <Button
            onClick={onSubmit}
            variant="alert"
            className="delete-loading"
            isLoading={isUpdatingLabel}
          >
            {t("common:buttons.delete")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("common:buttons.cancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteLabelModal;
