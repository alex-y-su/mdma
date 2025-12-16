import React, { useEffect } from "react";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import paths from "router/paths";
import usersAPI from "services/entities/users";

import CustomLink from "components/CustomLink";
import Button from "components/buttons/Button";
import AuthenticationFormWrapper from "components/AuthenticationFormWrapper";

interface IApiOnlyUserProps {
  router: InjectedRouter;
}

const baseClass = "api-only-user";

const ApiOnlyUser = ({ router }: IApiOnlyUserProps): JSX.Element => {
  const { t } = useTranslation();
  const { LOGIN, DASHBOARD, LOGOUT } = paths;
  const handleClick = () => router.push(LOGOUT);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { user } = await usersAPI.me();

        if (!user) {
          router.push(LOGIN);
        } else if (!user?.api_only) {
          router.push(DASHBOARD);
        }
      } catch (response) {
        console.error(response);
        return false;
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthenticationFormWrapper
      header={t("auth:apiOnlyUser.title")}
      className={baseClass}
    >
      <>
        <div>
          <p>
            {t("auth:apiOnlyUser.description")}{" "}
            <CustomLink
              text={t("auth:apiOnlyUser.linkText")}
              newTab
              url="https://fleetdm.com/docs/using-fleet/fleetctl-cli#using-fleetctl-with-an-api-only-user"
            />
            .
          </p>
          <p className={`${baseClass}__sub-lead-text`}>
            {t("auth:apiOnlyUser.noUiAccess")}
          </p>
        </div>
        <Button onClick={handleClick} className={`${baseClass}__login-button`}>
          {t("auth:apiOnlyUser.backToLogin")}
        </Button>
      </>
    </AuthenticationFormWrapper>
  );
};

export default ApiOnlyUser;
