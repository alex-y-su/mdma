import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { ITeam } from "interfaces/team";
import { IEnrollSecret } from "interfaces/enroll_secret";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
// @ts-ignore
import InputField from "components/forms/fields/InputField";

interface ISecretEditorModalProps {
  selectedTeam: number;
  onSaveSecret: (newEnrollSecret: string) => void;
  teams: ITeam[];
  toggleSecretEditorModal: () => void;
  selectedSecret: IEnrollSecret | undefined;
  isUpdatingSecret: boolean;
}

const baseClass = "secret-editor-modal";

const randomSecretGenerator = () => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 32; i += 1) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

const SecretEditorModal = ({
  onSaveSecret,
  selectedTeam,
  teams,
  toggleSecretEditorModal,
  selectedSecret,
  isUpdatingSecret,
}: ISecretEditorModalProps): JSX.Element => {
  const { t } = useTranslation();
  const [enrollSecretString, setEnrollSecretString] = useState(
    selectedSecret ? selectedSecret.secret : randomSecretGenerator()
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const renderTeam = () => {
    let teamId = selectedTeam;
    if (typeof teamId === "string") {
      teamId = parseInt(teamId, 10);
    }

    if (teamId === 0) {
      return { name: t("common:enrollSecrets.noTeam") };
    }
    return teams.find((team) => team.id === teamId);
  };

  const onSecretChange = (value: string) => {
    if (value.length < 32) {
      setErrors({
        secret: t("common:enrollSecrets.secretLabel"),
      });
    } else {
      setErrors({});
    }
    setEnrollSecretString(value);
  };

  const onSaveSecretClick = () => {
    if (enrollSecretString.length < 32) {
      setErrors({
        secret: t("common:enrollSecrets.secretLabel"),
      });
    } else {
      setErrors({});
      onSaveSecret(enrollSecretString);
    }
  };

  const teamName = renderTeam()?.name || "";

  return (
    <Modal
      onExit={toggleSecretEditorModal}
      onEnter={onSaveSecretClick}
      title={
        selectedSecret
          ? t("common:enrollSecrets.editTitle")
          : t("common:enrollSecrets.addTitle")
      }
      className={baseClass}
    >
      <div className={baseClass}>
        <div className={`${baseClass}__description`}>
          <Trans
            i18nKey="common:enrollSecrets.useSecrets"
            values={{ teamName }}
            components={{ bold: <b /> }}
            defaults="Use these secret(s) to enroll hosts to <bold>{{teamName}}</bold>."
          />
        </div>
        <div className={`${baseClass}__secret-wrapper`}>
          <InputField
            inputWrapperClass={`${baseClass}__secret-input`}
            name="osqueryd-secret"
            label={t("common:enrollSecrets.secretLabel")}
            type="text"
            value={enrollSecretString}
            onChange={onSecretChange}
            error={errors.secret}
            helpText={t("common:enrollSecrets.secretHelp")}
          />
        </div>
        <div className="modal-cta-wrap">
          <Button
            onClick={onSaveSecretClick}
            className="save-loading"
            isLoading={isUpdatingSecret}
          >
            {t("common:buttons.save")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SecretEditorModal;
