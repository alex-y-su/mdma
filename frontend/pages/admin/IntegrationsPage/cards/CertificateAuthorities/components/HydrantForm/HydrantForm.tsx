import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";
import {
  validateFormData,
  IHydrantFormValidation,
  generateFormValidations,
} from "./helpers";

const baseClass = "hydrant-form";

export interface IHydrantFormData {
  name: string;
  url: string;
  clientId: string;
  clientSecret: string;
}

interface IHydrantFormProps {
  certAuthorities?: ICertificateAuthorityPartial[];
  formData: IHydrantFormData;
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const HydrantForm = ({
  certAuthorities,
  formData,
  submitBtnText,
  isSubmitting,
  isEditing = false,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: IHydrantFormProps) => {
  const { t } = useTranslation("settings");
  const validations = useMemo(
    () => generateFormValidations(certAuthorities ?? [], isEditing),
    [certAuthorities, isEditing]
  );

  const [formValidation, setFormValidation] = useState<IHydrantFormValidation>(
    () => validateFormData(formData, validations)
  );

  const { name, url, clientId, clientSecret } = formData;

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
        helpText={t("certificateAuthorities.forms.nameHelpHydrant")}
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
        helpText={t("certificateAuthorities.forms.urlHelpHydrant")}
        placeholder="https://example.tau-platform.com/.well-known/est/abc123"
      />
      <InputField
        name="clientId"
        label={t("certificateAuthorities.forms.clientId")}
        value={clientId}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.clientIdHelp")}
      />
      <InputField
        name="clientSecret"
        label={t("certificateAuthorities.forms.clientSecret")}
        value={clientSecret}
        onChange={onInputChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.clientSecretHelp")}
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

export default HydrantForm;
