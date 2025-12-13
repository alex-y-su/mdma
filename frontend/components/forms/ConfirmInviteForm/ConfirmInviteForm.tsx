import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import validateEquality from "components/forms/validators/validate_equality";

import Button from "components/buttons/Button";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
import { IInputFieldParseTarget } from "interfaces/form_field";

const baseClass = "confirm-invite-page__form";
export interface IConfirmInviteFormData {
  name: string;
  password: string;
  password_confirmation: string;
}
interface IConfirmInviteFormProps {
  defaultFormData?: Partial<IConfirmInviteFormData>;
  handleSubmit: (data: IConfirmInviteFormData) => void;
  ancestorError?: string;
}
interface IConfirmInviteFormErrors {
  name?: string | null;
  password?: string | null;
  password_confirmation?: string | null;
}

const ConfirmInviteForm = ({
  defaultFormData,
  handleSubmit,
  ancestorError,
}: IConfirmInviteFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IConfirmInviteFormData>({
    name: defaultFormData?.name || "",
    password: defaultFormData?.password || "",
    password_confirmation: defaultFormData?.password || "",
  });
  const [formErrors, setFormErrors] = useState<IConfirmInviteFormErrors>({});

  const validate = (data: IConfirmInviteFormData) => {
    const errors: IConfirmInviteFormErrors = {};
    const {
      name,
      password,
      password_confirmation: passwordConfirmation,
    } = data;

    if (!name) {
      errors.name = t("forms:validation.fullNameRequired");
    }

    if (
      password &&
      passwordConfirmation &&
      !validateEquality(password, passwordConfirmation)
    ) {
      errors.password_confirmation = t(
        "forms:validation.passwordConfirmMismatch"
      );
    }

    if (!password) {
      errors.password = t("forms:validation.passwordPresent");
    }

    if (!passwordConfirmation) {
      errors.password_confirmation = t(
        "forms:validation.passwordConfirmPresent"
      );
    }

    return errors;
  };

  const { name, password, password_confirmation } = formData;

  const onInputChange = ({ name: n, value }: IInputFieldParseTarget) => {
    const newFormData = { ...formData, [n]: value };
    setFormData(newFormData);
    const newErrs = validate(newFormData);
    // only set errors that are updates of existing errors
    // new errors are only set on submit
    const errsToSet: Record<string, string> = {};
    Object.keys(formErrors).forEach((k) => {
      // @ts-ignore
      if (newErrs[k]) {
        // @ts-ignore
        errsToSet[k] = newErrs[k];
      }
    });
    setFormErrors(errsToSet);
  };

  const onSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const errs = validate(formData);
      if (Object.keys(errs).length > 0) {
        setFormErrors(errs);
        return;
      }
      handleSubmit(formData);
    },
    [formData, handleSubmit]
  );

  return (
    <form onSubmit={onSubmit} className={baseClass} autoComplete="off">
      {ancestorError && <div className="form__base-error">{ancestorError}</div>}
      <InputField
        label={t("auth:invite.fullNameLabel")}
        autofocus
        onChange={onInputChange}
        name="name"
        value={name}
        error={formErrors.name}
        parseTarget
        maxLength={80}
      />
      <InputField
        label={t("auth:invite.passwordLabel")}
        type="password"
        placeholder={t("auth:invite.passwordPlaceholder")}
        helpText={t("auth:invite.passwordHint")}
        onChange={onInputChange}
        name="password"
        value={password}
        error={formErrors.password}
        parseTarget
      />
      <InputField
        label={t("auth:invite.confirmPasswordLabel")}
        type="password"
        placeholder={t("auth:invite.confirmPasswordPlaceholder")}
        onChange={onInputChange}
        name="password_confirmation"
        value={password_confirmation}
        error={formErrors.password_confirmation}
        parseTarget
      />
      <div className="button-wrap">
        <Button
          type="submit"
          disabled={Object.keys(formErrors).length > 0}
          className="confirm-invite-button"
        >
          {t("auth:invite.submitButton")}
        </Button>
      </div>
    </form>
  );
};

export default ConfirmInviteForm;
