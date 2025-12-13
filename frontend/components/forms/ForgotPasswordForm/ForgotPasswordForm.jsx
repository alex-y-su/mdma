import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import formFieldInterface from "interfaces/form_field";
import InputFieldWithIcon from "components/forms/fields/InputFieldWithIcon";
import validate from "./validate";

const baseClass = "forgot-password-form";
const fieldNames = ["email"];

class ForgotPasswordForm extends Component {
  static propTypes = {
    baseError: PropTypes.string,
    fields: PropTypes.shape({
      email: formFieldInterface.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    t: PropTypes.func.isRequired,
  };

  render() {
    const { baseError, fields, handleSubmit, isLoading, t } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className={baseClass}
        autoComplete="off"
        noValidate
      >
        {baseError && <div className="form__base-error">{baseError}</div>}
        <p>{t("auth:forgotPassword.subtitle")}</p>
        <InputFieldWithIcon
          {...fields.email}
          autofocus
          label={t("auth:forgotPassword.emailLabel")}
          placeholder={t("auth:forgotPassword.emailPlaceholder")}
          type="email"
        />
        <div className="button-wrap">
          <Button
            className={`${baseClass}__submit-btn`}
            type="submit"
            isLoading={isLoading}
          >
            {t("auth:forgotPassword.submitButton")}
          </Button>
        </div>
      </form>
    );
  }
}

export default withTranslation()(
  Form(ForgotPasswordForm, {
    fields: fieldNames,
    validate,
  })
);
