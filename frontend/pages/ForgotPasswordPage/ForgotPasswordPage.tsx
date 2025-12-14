import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { InjectedRouter } from "react-router";
import PATHS from "router/paths";
import usersAPI from "services/entities/users";
import formatErrorResponse from "utilities/format_error_response";

// @ts-ignore
import ForgotPasswordForm from "components/forms/ForgotPasswordForm";
import AuthenticationNav from "components/AuthenticationNav";
import AuthenticationFormWrapper from "components/AuthenticationFormWrapper";
import CustomLink from "components/CustomLink";

interface IForgotPasswordPage {
  router: InjectedRouter;
}

const ForgotPasswordPage = ({ router }: IForgotPasswordPage) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const baseClass = "forgot-password";

  useEffect(() => {
    setErrors({});
  }, []);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      await usersAPI.forgotPassword(formData);

      setEmail(formData.email);
      setErrors({});
    } catch (response) {
      const errorObject = formatErrorResponse(response);
      setEmail("");
      setErrors(errorObject);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (email) {
      return (
        <div className={`${baseClass}__text-wrapper`}>
          <p className={`${baseClass}__text`}>
            <Trans
              i18nKey="forgot_password.success_message"
              values={{ email }}
              components={[<></>, <span className={`${baseClass}__email`} />]}
            />
            <br />
            <br />
            {t("forgot_password.success_additional_info")}{" "}
            <CustomLink
              url="https://fleetdm.com/docs/using-fleet/fleetctl-cli?utm_medium=fleetui&utm_campaign=get-api-token#using-fleetctl-with-an-api-only-user"
              text={t("forgot_password.faq_link_text")}
              newTab
            />
          </p>
        </div>
      );
    }

    return (
      <ForgotPasswordForm
        handleSubmit={handleSubmit}
        onChangeFunc={() => setErrors({})}
        serverErrors={errors}
        isLoading={isLoading}
      />
    );
  };

  return (
    <AuthenticationFormWrapper
      header={t("forgot_password.header")}
      headerCta={
        <AuthenticationNav previousLocation={PATHS.LOGIN} router={router} />
      }
      className={baseClass}
    >
      {renderContent()}
    </AuthenticationFormWrapper>
  );
};

export default ForgotPasswordPage;
