import React from "react";
import { Trans, useTranslation } from "react-i18next";

import strUtils from "utilities/strings";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink";
import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";

const baseClass = "delete-host-modal";

interface IDeleteHostModalProps {
  onSubmit: () => void;
  onCancel: () => void;
  /** Manage host page only */
  isAllMatchingHostsSelected?: boolean;
  /** Manage host page only */
  selectedHostIds?: number[];
  /** Manage host page only */
  hostsCount?: number;
  /** Host details page only */
  hostName?: string;
  isUpdating: boolean;
}

const DeleteHostModal = ({
  onSubmit,
  onCancel,
  isAllMatchingHostsSelected,
  selectedHostIds,
  hostsCount,
  hostName,
  isUpdating,
}: IDeleteHostModalProps): JSX.Element => {
  const { t } = useTranslation();

  const pluralizeHost = () => {
    if (!selectedHostIds) {
      return "host";
    }
    return strUtils.pluralize(selectedHostIds.length, "host");
  };

  const hostText = () => {
    if (selectedHostIds) {
      return `${selectedHostIds.length}${
        isAllMatchingHostsSelected ? "+" : ""
      } ${pluralizeHost()}`;
    }
    return hostName;
  };

  const hasManyHosts =
    selectedHostIds &&
    isAllMatchingHostsSelected &&
    hostsCount &&
    hostsCount >= 500;

  return (
    <Modal
      title={t("hosts:deleteHostModal.title")}
      onExit={onCancel}
      className={baseClass}
    >
      <>
        <p>
          <Trans
            i18nKey="hosts:deleteHostModal.description"
            values={{ hostText: hostText() }}
            components={{ strong: <b /> }}
          />
        </p>
        {hasManyHosts && <p>{t("hosts:deleteHostModal.manyHostsWarning")}</p>}
        <ul>
          <li>
            {t("hosts:deleteHostModal.reappearWarning")}{" "}
            <CustomLink
              text={t("hosts:deleteHostModal.uninstallAgent")}
              url={`${LEARN_MORE_ABOUT_BASE_LINK}/uninstall-fleetd`}
              newTab
            />
          </li>
          <li>
            {/* TODO(android): iOS, iPadOS, and Android hosts will re-appear unless MDM is turned
            off. */}
            {t("hosts:deleteHostModal.mobileWarning")}
          </li>
        </ul>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onSubmit}
            variant="alert"
            className="delete-loading"
            isLoading={isUpdating}
          >
            {t("hosts:deleteHostModal.delete")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("hosts:deleteHostModal.cancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteHostModal;
