import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { size } from "lodash";

import { IResetPasswordForm, IResetPasswordFormErrors } from "interfaces/user";

import Button from "components/buttons/Button";
// @ts-ignore
import InputFieldWithIcon from "components/forms/fields/InputFieldWithIcon";
import validatePresence from "components/forms/validators/validate_presence";
import validatePassword from "components/forms/validators/valid_password";
import validateEquality from "components/forms/validators/validate_equality";

const baseClass = "reset-password-form";

// Response created by utilities/format_error_response
export interface IOldApiError {
  http_status: number;
  base: string;
}

export interface IFormData {
  new_password: string;
  new_password_confirmation: string;
}

interface IResetPasswordFormProps {
  serverErrors: IOldApiError;
  handleSubmit: (formData: IFormData) => void;
}
const ResetPasswordForm = ({
  serverErrors,
  handleSubmit,
}: IResetPasswordFormProps): JSX.Element => {
  const { t } = useTranslation("auth");
  const [errors, setErrors] = useState<IResetPasswordFormErrors>({});
  const [formData, setFormData] = useState<IResetPasswordForm>({
    new_password: "",
    new_password_confirmation: "",
  });

  const validate = (): boolean => {
    const {
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    } = formData;

    const noMatch =
      newPassword &&
      newPasswordConfirmation &&
      !validateEquality(newPassword, newPasswordConfirmation);

    const validationErrors: { [key: string]: string } = {};

    const { isValid, error } = validatePassword(newPassword);
    if (!isValid) {
      validationErrors.new_password = error;
    }

    if (!validatePresence(newPasswordConfirmation)) {
      validationErrors.new_password_confirmation = t(
        "reset_password.validation.confirm_password_required"
      );
    }

    if (!validatePresence(newPassword)) {
      validationErrors.new_password = t(
        "reset_password.validation.new_password_required"
      );
    }

    if (noMatch) {
      validationErrors.new_password_confirmation = t(
        "reset_password.validation.passwords_no_match"
      );
    }

    setErrors(validationErrors);
    const valid = !size(validationErrors);
    return valid;
  };

  const onFormSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    const valid = validate();

    if (valid) {
      return handleSubmit(formData);
    }
  };

  const onInputChange = (formField: string): ((value: string) => void) => {
    return (value: string) => {
      setErrors({});
      setFormData({
        ...formData,
        [formField]: value,
      });
    };
  };

  return (
    <form className={baseClass}>
      {serverErrors?.base && (
        <div className="form__base-error">{serverErrors.base}</div>
      )}
      <InputFieldWithIcon
        error={errors.new_password}
        autofocus
        label={t("reset_password.new_password_label")}
        placeholder={t("reset_password.new_password_placeholder")}
        onChange={onInputChange("new_password")}
        value={formData.new_password || ""}
        className={`${baseClass}__input`}
        type="password"
        helpText={t("reset_password.new_password_help")}
      />
      <InputFieldWithIcon
        error={errors.new_password_confirmation}
        label={t("reset_password.confirm_password_label")}
        placeholder={t("reset_password.confirm_password_placeholder")}
        onChange={onInputChange("new_password_confirmation")}
        value={formData.new_password_confirmation || ""}
        className={`${baseClass}__input`}
        type="password"
      />
      <div className="button-wrap">
        <Button
          type="submit"
          onClick={onFormSubmit}
          className={`${baseClass}__btn`}
        >
          {t("reset_password.submit_button")}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
