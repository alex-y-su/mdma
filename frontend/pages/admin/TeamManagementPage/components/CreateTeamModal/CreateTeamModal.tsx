import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ITeamFormData } from "services/entities/teams";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import InfoBanner from "components/InfoBanner/InfoBanner";
// @ts-ignore
import InputField from "components/forms/fields/InputField";

const baseClass = "create-team-modal";

interface ICreateTeamModalProps {
  onCancel: () => void;
  onSubmit: (formData: ITeamFormData) => void;
  backendValidators: { [key: string]: string };
  isUpdatingTeams: boolean;
}

const CreateTeamModal = ({
  onCancel,
  onSubmit,
  backendValidators,
  isUpdatingTeams,
}: ICreateTeamModalProps): JSX.Element => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    backendValidators
  );

  useEffect(() => {
    setErrors(backendValidators);
  }, [backendValidators]);

  const onInputChange = useCallback(
    (value: string) => {
      setName(value);
      setErrors({});
    },
    [setName]
  );

  const onFormSubmit = useCallback(
    (evt: any) => {
      evt.preventDefault();
      onSubmit({
        name: name.trim(),
      });
    },
    [onSubmit, name]
  );

  return (
    <Modal
      title={t("settings:admin.teams.modals.createTeam.title")}
      onExit={onCancel}
      className={baseClass}
    >
      <form
        className={`${baseClass}__form`}
        onSubmit={onFormSubmit}
        autoComplete="off"
      >
        <InputField
          autofocus
          name="name"
          onChange={onInputChange}
          onBlur={() => {
            setName(name.trim());
          }}
          label={t("settings:admin.teams.modals.createTeam.nameLabel")}
          placeholder={t(
            "settings:admin.teams.modals.createTeam.namePlaceholder"
          )}
          value={name}
          error={errors.name}
          ignore1password
        />
        <InfoBanner className={`${baseClass}__sandbox-info`}>
          {t("settings:admin.teams.modals.createTeam.infoBanner")}
        </InfoBanner>
        <div className="modal-cta-wrap">
          <Button
            type="submit"
            disabled={name === ""}
            className="create-loading"
            isLoading={isUpdatingTeams}
          >
            {t("settings:admin.teams.modals.createTeam.createButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse">
            {t("settings:admin.teams.modals.createTeam.cancelButton")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
