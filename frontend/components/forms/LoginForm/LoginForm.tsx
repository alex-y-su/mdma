import React, { FormEvent, useEffect, useState } from "react";
import { size } from "lodash";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { ILoginUserData } from "interfaces/user";

import CustomLink from "components/CustomLink";
import Icon from "components/Icon";
import Button from "components/buttons/Button";
// @ts-ignore
import InputFieldWithIcon from "components/forms/fields/InputFieldWithIcon";
import paths from "router/paths";
import { ISSOSettings } from "interfaces/ssoSettings";
import validatePresence from "components/forms/validators/validate_presence";
import validateEmail from "components/forms/validators/valid_email";

const baseClass = "login-form";

interface ILoginFormProps {
  baseError?: string;
  handleSubmit: (formData: ILoginUserData) => Promise<false | void>;
  isSubmitting: boolean;
  pendingEmail: boolean;
  ssoSettings?: ISSOSettings;
  handleSSOSignOn?: () => void;
}

const LoginForm = ({
  baseError,
  handleSubmit,
  isSubmitting,
  pendingEmail,
  ssoSettings,
  handleSSOSignOn,
}: ILoginFormProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    idp_name: idpName,
    idp_image_url: imageURL,
    sso_enabled: ssoEnabled,
  } = ssoSettings || {}; // TODO: Consider refactoring ssoSettings undefined

  const loginFormClass = classnames(baseClass);

  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<ILoginUserData>({
    email: "",
    password: "",
  });
  const [showPendingEmail, setShowPendingEmail] = useState(pendingEmail);

  useEffect(() => {
    setShowPendingEmail(pendingEmail);
  }, [pendingEmail]);

  const validate = () => {
    const { password, email } = formData;

    const validationErrors: { [key: string]: string } = {};

    if (!validatePresence(email)) {
      validationErrors.email = t("forms:validation.emailRequired");
    } else if (!validateEmail(email)) {
      validationErrors.email = t("forms:validation.emailInvalid");
    }

    if (!validatePresence(password)) {
      validationErrors.password = t("forms:validation.passwordRequired");
    }

    setErrors(validationErrors);
    const valid = !size(validationErrors);

    return valid;
  };

  const onFormSubmit = (evt: FormEvent): Promise<false | void> | boolean => {
    evt.preventDefault();
    const valid = validate();

    if (valid) {
      return handleSubmit(formData);
    }
    return false;
  };

  const showLegendWithImage = () => {
    let legend = t("auth:login.sso.title");
    if (idpName !== "") {
      legend = t("auth:login.sso.signInWith", { idpName });
    }

    return (
      <div>
        <img
          src={imageURL}
          alt={idpName}
          className={`${baseClass}__sso-image`}
        />
        <span className={`${baseClass}__sso-legend`}>{legend}</span>
      </div>
    );
  };

  const renderSingleSignOnButton = () => {
    let legend: string | JSX.Element = t("auth:login.sso.title");
    if (idpName !== "") {
      legend = t("auth:login.sso.signInWith", { idpName });
    }
    if (imageURL !== "") {
      legend = showLegendWithImage();
    }

    return (
      <Button
        className={`${baseClass}__sso-btn`}
        type="button"
        title={t("auth:login.sso.title")}
        variant="inverse"
        onClick={handleSSOSignOn}
      >
        <div>{legend}</div>
      </Button>
    );
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

  if (showPendingEmail) {
    return (
      <div className="two-factor-check-email">
        <>
          <Button
            onClick={() => setShowPendingEmail(false)}
            variant="inverse"
            className="back-link"
          >
            <Icon name="chevron-left" color="ui-fleet-black-75" />
            {t("auth:login.sso.backToLogin")}
          </Button>
          <h1>{t("auth:login.magicLink.checkEmail")}</h1>
          <p className={`${baseClass}__text`}>
            {t("auth:login.magicLink.emailSent", { email: formData.email })}
          </p>
        </>
      </div>
    );
  }

  return (
    <form onSubmit={onFormSubmit} className={loginFormClass} noValidate>
      {baseError && <div className="form__base-error">{baseError}</div>}
      <div className={`${baseClass}__form`}>
        <InputFieldWithIcon
          error={errors.email}
          autofocus
          type="email"
          label={t("auth:login.emailLabel")}
          placeholder={t("auth:login.emailPlaceholder")}
          value={formData.email}
          onChange={onInputChange("email")}
        />
        <InputFieldWithIcon
          error={errors.password}
          label={t("auth:login.passwordLabel")}
          placeholder={t("auth:login.passwordPlaceholder")}
          type="password"
          value={formData.password}
          onChange={onInputChange("password")}
        />
      </div>
      {/* Actions displayed using CSS column-reverse to preserve tab order */}
      <div className={`${baseClass}__actions`}>
        <div className={`${baseClass}__login-actions`}>
          <Button
            className={`${baseClass}__login-btn`}
            isLoading={isSubmitting}
            type="submit"
          >
            {t("auth:login.submitButton")}
          </Button>
          {ssoEnabled && renderSingleSignOnButton()}
        </div>
        <CustomLink
          className={`${baseClass}__forgot-link`}
          url={paths.FORGOT_PASSWORD}
          text={t("auth:login.forgotPassword")}
        />
      </div>
    </form>
  );
};

export default LoginForm;
