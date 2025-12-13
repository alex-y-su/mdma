import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import formFieldInterface from "interfaces/form_field";
import InputField from "components/forms/fields/InputField";

const baseClass = "change-email-form";

const ChangeEmailForm = ({ fields, handleSubmit, onCancel }) => {
  const { t } = useTranslation();

  return (
    <form className={baseClass} onSubmit={handleSubmit}>
      {t("settings:account.changeEmail.confirmPassword")}
      <InputField
        {...fields.password}
        autofocus
        label={t("settings:account.changeEmail.passwordLabel")}
        type="password"
      />
      <div className="modal-cta-wrap">
        <Button type="submit">{t("common:buttons.submit")}</Button>
        <Button onClick={onCancel} variant="inverse">
          {t("common:buttons.cancel")}
        </Button>
      </div>
    </form>
  );
};

ChangeEmailForm.propTypes = {
  fields: PropTypes.shape({
    password: formFieldInterface.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Form(ChangeEmailForm, {
  fields: ["password"],
  validate: (formData) => {
    if (!formData.password) {
      return {
        valid: false,
        errors: { password: "Password must be present" },
      };
    }

    return { valid: true, errors: {} };
  },
});
