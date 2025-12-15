import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

import { INDESFormValidation, validateFormData } from "./helpers";

const baseClass = "ndes-form";

export interface INDESFormData {
  scepURL: string;
  adminURL: string;
  username: string;
  password: string;
}

interface INDESFormProps {
  formData: INDESFormData;
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const NDESForm = ({
  formData,
  submitBtnText,
  isSubmitting,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: INDESFormProps) => {
  const { t } = useTranslation("settings");
  const [formValidation, setFormValidation] = useState<INDESFormValidation>(
    () => validateFormData(formData)
  );

  const { scepURL, adminURL, username, password } = formData;

  const onSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit();
  };

  const onInputChange = (update: { name: string; value: string }) => {
    setFormValidation(
      validateFormData({ ...formData, [update.name]: update.value })
    );
    onChange(update);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <InputField
        label={t("certificateAuthorities.forms.scepUrl")}
        name="scepURL"
        value={scepURL}
        error={formValidation.scepURL?.message}
        onChange={onInputChange}
        parseTarget
        placeholder="https://example.com/certsrv/mscep/mscep.dll"
        helpText={t("certificateAuthorities.forms.scepUrlHelpNdes")}
      />
      <InputField
        label={t("certificateAuthorities.forms.adminUrl")}
        name="adminURL"
        value={adminURL}
        error={formValidation.adminURL?.message}
        onChange={onInputChange}
        parseTarget
        placeholder="https://example.com/certsrv/mscep_admin/"
        helpText={t("certificateAuthorities.forms.adminUrlHelp")}
      />
      <InputField
        label={t("certificateAuthorities.forms.username")}
        name="username"
        value={username}
        onChange={onInputChange}
        parseTarget
        placeholder="username@example.microsoft.com"
        helpText={t("certificateAuthorities.forms.usernameHelpNdes")}
      />
      <InputField
        label={t("certificateAuthorities.forms.password")}
        name="password"
        value={password}
        type="password"
        onChange={onInputChange}
        parseTarget
        blockAutoComplete
        helpText={t("certificateAuthorities.forms.passwordHelpNdes")}
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

export default NDESForm;
