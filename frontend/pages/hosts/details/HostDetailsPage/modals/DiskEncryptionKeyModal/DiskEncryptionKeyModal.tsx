import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import { IHostEncrpytionKeyResponse } from "interfaces/host";
import hostAPI from "services/entities/hosts";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import InputFieldHiddenContent from "components/forms/fields/InputFieldHiddenContent";
import DataError from "components/DataError";
import CustomLink from "components/CustomLink";
import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";
import { HostPlatform } from "interfaces/platform";

const baseClass = "disk-encryption-key-modal";

interface IDiskEncryptionKeyModal {
  platform: HostPlatform;
  hostId: number;
  onCancel: () => void;
}

const DiskEncryptionKeyModal = ({
  platform,
  hostId,
  onCancel,
}: IDiskEncryptionKeyModal) => {
  const { t } = useTranslation("hosts");

  const { data: encryptionKey, error: encryptionKeyError } = useQuery<
    IHostEncrpytionKeyResponse,
    unknown,
    string
  >("hostEncrpytionKey", () => hostAPI.getEncryptionKey(hostId), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    select: (data) => data.encryption_key.key,
  });

  const recoveryText =
    platform === "darwin"
      ? t("modals.diskEncryptionKey.recoveryTextDarwin")
      : t("modals.diskEncryptionKey.recoveryTextOther");

  return (
    <Modal
      title={t("modals.diskEncryptionKey.title")}
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
    >
      {encryptionKeyError ? (
        <DataError />
      ) : (
        <>
          <InputFieldHiddenContent value={encryptionKey ?? ""} />
          <p>
            {recoveryText}{" "}
            <CustomLink
              newTab
              url={`${LEARN_MORE_ABOUT_BASE_LINK}/mdm-disk-encryption`}
              text={t("modals.diskEncryptionKey.learnMore")}
            />
          </p>
          <div className="modal-cta-wrap">
            <Button onClick={onCancel}>{t("modals.diskEncryptionKey.done")}</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DiskEncryptionKeyModal;
