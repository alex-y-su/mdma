import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import formFieldInterface from "interfaces/form_field";
import InputField from "components/forms/fields/InputField";
import validate from "components/forms/ChangePasswordForm/validate";

const formFields = [
  "old_password",
  "new_password",
  "new_password_confirmation",
];
const baseClass = "change-password-form";

const ChangePasswordForm = ({ fields, handleSubmit, onCancel }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className={baseClass}>
      <InputField
        {...fields.old_password}
        autofocus
        label={t("settings:account.changePasswordForm.originalPassword")}
        type="password"
      />
      <InputField
        {...fields.new_password}
        label={t("settings:account.changePasswordForm.newPassword")}
        type="password"
        helpText={t("settings:account.changePasswordForm.passwordRequirements")}
      />
      <InputField
        {...fields.new_password_confirmation}
        label={t("settings:account.changePasswordForm.confirmPassword")}
        type="password"
      />
      <div className="modal-cta-wrap">
        <Button type="submit">{t("settings:account.changePassword")}</Button>
        <Button onClick={onCancel} variant="inverse">
          {t("common:buttons.cancel")}
        </Button>
      </div>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  fields: PropTypes.shape({
    old_password: formFieldInterface.isRequired,
    new_password: formFieldInterface.isRequired,
    new_password_confirmation: formFieldInterface.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form(ChangePasswordForm, { fields: formFields, validate });
