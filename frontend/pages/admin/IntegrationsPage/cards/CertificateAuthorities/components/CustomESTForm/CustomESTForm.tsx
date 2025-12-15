import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

import { generateFormValidations, validateFormData } from "./helpers";

export interface ICustomESTFormData {
  name: string;
  url: string;
  username: string;
  password: string;
}
interface ICustomESTFormProps {
  formData: ICustomESTFormData;
  certAuthorities?: ICertificateAuthorityPartial[];
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CustomESTForm = ({
  formData,
  certAuthorities,
  submitBtnText,
  isSubmitting,
  isEditing = false,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: ICustomESTFormProps) => {
  const { t } = useTranslation("settings");
  const validationsConfig = useMemo(() => {
    return generateFormValidations(certAuthorities ?? [], isEditing);
  }, [certAuthorities, isEditing]);

  const validations = useMemo(() => {
    return validateFormData(formData, validationsConfig);
  }, [formData, validationsConfig]);

  const { name, url, username, password } = formData;

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <InputField
        label={t("certificateAuthorities.forms.name")}
        name="name"
        value={name}
        error={validations.name?.message}
        onChange={onChange}
        parseTarget
        placeholder="WIFI_CERTIFICATE"
        helpText={t("certificateAuthorities.forms.nameHelpSimple")}
      />
      <InputField
        label={t("certificateAuthorities.forms.url")}
        name="url"
        value={url}
        error={validations.url?.message}
        onChange={onChange}
        parseTarget
        placeholder="https://example.com/well-known/est/abc123"
      />
      <InputField
        label={t("certificateAuthorities.forms.username")}
        name="username"
        value={username}
        error={validations.username?.message}
        onChange={onChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.usernameHelpEst")}
      />
      <InputField
        type="password"
        label={t("certificateAuthorities.forms.password")}
        name="password"
        value={password}
        error={validations.password?.message}
        onChange={onChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.passwordHelpEst")}
      />
      <div className="modal-cta-wrap">
        <TooltipWrapper
          tipContent={t("certificateAuthorities.forms.completeRequired")}
          underline={false}
          position="top"
          disableTooltip={validations.isValid}
          showArrow
        >
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!validations.isValid || isSubmitting || !isDirty}
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

export default CustomESTForm;
