import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

import {
  generateFormValidations,
  ICustomSCEPFormValidation,
  validateFormData,
} from "./helpers";

const baseClass = "ndes-form";

export interface ICustomSCEPFormData {
  name: string;
  scepURL: string;
  challenge: string;
}

interface ICustomSCEPFormProps {
  certAuthorities?: ICertificateAuthorityPartial[];
  formData: ICustomSCEPFormData;
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CustomSCEPForm = ({
  certAuthorities,
  formData,
  submitBtnText,
  isSubmitting,
  isEditing = false,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: ICustomSCEPFormProps) => {
  const { t } = useTranslation("settings");
  const validations = useMemo(
    () => generateFormValidations(certAuthorities ?? [], isEditing),
    [certAuthorities, isEditing]
  );
  const [
    formValidation,
    setFormValidation,
  ] = useState<ICustomSCEPFormValidation>(() =>
    validateFormData(formData, validations)
  );

  const { name, scepURL, challenge } = formData;

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
    <form onSubmit={onSubmitForm}>
      <InputField
        label={t("certificateAuthorities.forms.name")}
        name="name"
        value={name}
        error={formValidation.name?.message}
        onChange={onInputChange}
        parseTarget
        placeholder="WIFI_CERTIFICATE"
        helpText={t("certificateAuthorities.forms.nameHelpCustomScep")}
      />
      <InputField
        label={t("certificateAuthorities.forms.scepUrl")}
        name="scepURL"
        value={scepURL}
        error={formValidation.scepURL?.message}
        onChange={onInputChange}
        parseTarget
        placeholder="https://example.com/scep"
      />
      <InputField
        type="password"
        label={t("certificateAuthorities.forms.challenge")}
        name="challenge"
        value={challenge}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.challengeHelp")}
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
            type="submit"
            isLoading={isSubmitting}
            disabled={!formValidation.isValid || isSubmitting || !isDirty}
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

export default CustomSCEPForm;
