import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import { IScheduledQuery } from "interfaces/scheduled_query";

const baseClass = "remove-pack-query-modal";

interface IRemovePackQueryModalProps {
  onCancel: () => void;
  onSubmit: () => void;
  selectedQuery?: IScheduledQuery;
  selectedQueryIds: number[];
  isUpdatingPack: boolean;
}

const RemovePackQueryModal = ({
  onCancel,
  onSubmit,
  selectedQuery,
  selectedQueryIds,
  isUpdatingPack,
}: IRemovePackQueryModalProps): JSX.Element => {
  const { t } = useTranslation("queries");
  const queryOrQueries =
    selectedQuery || selectedQueryIds?.length === 1 ? t("packs.manage.query") : t("packs.manage.queries");
  return (
    <Modal
      title={t("packs.modals.removeQuery.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <div className={baseClass}>
        {t("packs.modals.removeQuery.message", { queryOrQueries })}
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onSubmit}
            className="remove-loading"
            isLoading={isUpdatingPack}
          >
            {t("packs.modals.removeQuery.removeButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("packs.modals.removeQuery.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemovePackQueryModal;
