import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

import { generateFormValidations, validateFormData } from "./helpers";

const baseClass = "smallstep-form";

export interface ISmallstepFormData {
  name: string;
  scepURL: string;
  challengeURL: string;
  username: string;
  password: string;
}

interface ISmallstepFormProps {
  certAuthorities?: ICertificateAuthorityPartial[];
  formData: ISmallstepFormData;
  submitBtnText: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  isDirty?: boolean;
  onChange: (update: { name: string; value: string }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const SmallstepForm = ({
  certAuthorities,
  formData,
  submitBtnText,
  isSubmitting,
  isEditing = false,
  isDirty = true,
  onChange,
  onSubmit,
  onCancel,
}: ISmallstepFormProps) => {
  const { t } = useTranslation("settings");
  const validationsConfig = useMemo(() => {
    return generateFormValidations(certAuthorities ?? [], isEditing);
  }, [certAuthorities, isEditing]);

  const validations = useMemo(() => {
    return validateFormData(formData, validationsConfig);
  }, [formData, validationsConfig]);

  const { name, scepURL, challengeURL, username, password } = formData;

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
        helpText={t("certificateAuthorities.forms.nameHelpSmallstep")}
      />
      <InputField
        label={t("certificateAuthorities.forms.scepUrl")}
        name="scepURL"
        value={scepURL}
        error={validations.scepURL?.message}
        onChange={onChange}
        parseTarget
        placeholder="https://example.scep.smallstep.com/p/agents/integration-fleet-xr9f4db7"
      />
      <InputField
        label={t("certificateAuthorities.forms.challengeUrl")}
        name="challengeURL"
        value={challengeURL}
        error={validations.challengeURL?.message}
        onChange={onChange}
        parseTarget
        placeholder="https://example.scep.smallstep.com/fleet/xr9f4db7-83f1-48ab-8982-8b6870d4fl85/challenge"
        helpText={t("certificateAuthorities.forms.challengeUrlHelp")}
      />
      <InputField
        label={t("certificateAuthorities.forms.username")}
        name="username"
        value={username}
        error={validations.username?.message}
        onChange={onChange}
        parseTarget
        placeholder={"r9c5faea-af93-4679-922c-5548c6254438"}
        helpText={t("certificateAuthorities.forms.usernameHelpSmallstep")}
      />
      <InputField
        type="password"
        label={t("certificateAuthorities.forms.password")}
        name="password"
        value={password}
        error={validations.password?.message}
        onChange={onChange}
        parseTarget
        helpText={t("certificateAuthorities.forms.passwordHelpSmallstep")}
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

export default SmallstepForm;
