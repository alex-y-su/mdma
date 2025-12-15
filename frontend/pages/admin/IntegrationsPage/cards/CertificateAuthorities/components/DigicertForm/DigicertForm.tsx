import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink";
import TooltipWrapper from "components/TooltipWrapper";
import {
  validateFormData,
  IDigicertFormValidation,
  generateFormValidations,
} from "./helpers";

const baseClass = "digicert-form";

export interface IDigicertFormData {
  name: string;
  url: string;
  apiToken: string;
  profileId: string;
  commonName: string;
  userPrincipalName: string;
  certificateSeatId: string;
}

interface IDigicertFormProps {
  certAuthorities?: ICertificateAuthorityPartial[];
  formData: IDigicertFormData;
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const DigicertForm = ({
  certAuthorities,
  formData,
  submitBtnText,
  isSubmitting,
  isEditing = false,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: IDigicertFormProps) => {
  const { t } = useTranslation("settings");
  const validations = useMemo(
    () => generateFormValidations(certAuthorities ?? [], isEditing),
    [certAuthorities, isEditing]
  );

  const [formValidation, setFormValidation] = useState<IDigicertFormValidation>(
    () => validateFormData(formData, validations)
  );

  const {
    name,
    url,
    apiToken,
    profileId,
    commonName,
    userPrincipalName,
    certificateSeatId,
  } = formData;

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit();
  };

  const onInputChange = (update: { name: string; value: string }) => {
    setFormValidation(
      validateFormData(
        { ...formData, [update.name]: update.value },
        validations
      )
    );
    onChange(update);
  };

  return (
    <form className={baseClass} onSubmit={onSubmitForm}>
      <InputField
        name="name"
        label={t("certificateAuthorities.forms.name")}
        value={name}
        onChange={onInputChange}
        error={formValidation.name?.message}
        helpText={t("certificateAuthorities.forms.nameHelpDigicert")}
        parseTarget
        placeholder="WIFI_CERTIFICATE"
      />
      <InputField
        name="url"
        label={t("certificateAuthorities.forms.url")}
        value={url}
        onChange={onInputChange}
        error={formValidation.url?.message}
        parseTarget
        helpText={t("certificateAuthorities.forms.urlHelpDigicert")}
      />
      <InputField
        type="password"
        name="apiToken"
        label={t("certificateAuthorities.forms.apiToken")}
        value={apiToken}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.apiTokenHelp")}
      />
      <InputField
        name="profileId"
        label={t("certificateAuthorities.forms.profileGuid")}
        value={profileId}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.profileGuidHelp")}
      />
      <InputField
        name="commonName"
        label={t("certificateAuthorities.forms.commonName")}
        value={commonName}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.commonNameHelp")}
        placeholder="$FLEET_VAR_HOST_HARDWARE_SERIAL"
      />
      <InputField
        name="userPrincipalName"
        label={t("certificateAuthorities.forms.userPrincipalName")}
        value={userPrincipalName}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.userPrincipalNameHelp")}
        placeholder="$FLEET_VAR_HOST_HARDWARE_SERIAL"
      />
      <InputField
        name="certificateSeatId"
        label={t("certificateAuthorities.forms.certificateSeatId")}
        value={certificateSeatId}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.certificateSeatIdHelp")}
        placeholder="$FLEET_VAR_HOST_HARDWARE_SERIAL"
      />
      <div className="modal-cta-wrap">
        <TooltipWrapper
          tipContent={t("certificateAuthorities.forms.completeRequired")}
          underline={false}
          position="top"
          disableTooltip={formValidation.isValid}
          showArrow
        >
          <Button
            isLoading={isSubmitting}
            disabled={!formValidation.isValid || isSubmitting || !isDirty}
            type="submit"
          >
            {submitBtnText}
          </Button>
        </TooltipWrapper>
        <Button variant="inverse" onClick={onCancel}>
          {t("certificateAuthorities.forms.cancel")}
        </Button>
      </div>
    </form>
  );
};

export default DigicertForm;
