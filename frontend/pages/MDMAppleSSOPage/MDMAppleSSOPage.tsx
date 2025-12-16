import React, { useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { WithRouterProps } from "react-router";
import { useTranslation } from "react-i18next";

import mdmAPI, { IMDMSSOParams } from "services/entities/mdm";

import SSOError from "components/MDM/SSOError";
import Spinner from "components/Spinner/Spinner";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink";
import { IMdmSSOReponse } from "interfaces/mdm";
import AuthenticationFormWrapper from "components/AuthenticationFormWrapper";

const baseClass = "mdm-apple-sso-page";

const DEPSSOLoginPage = ({
  location: { pathname, query },
}: WithRouterProps<object, IMDMSSOParams>) => {
  const { t } = useTranslation("auth");
  const [clickedLogin, setClickedLogin] = useState(false);
  localStorage.setItem("deviceinfo", query.deviceinfo || "");
  if (!query.initiator) {
    query.initiator =
      pathname === "/mdm/apple/account_driven_enroll/sso"
        ? "account_driven_enroll"
        : "mdm_sso";
  }
  const { error } = useQuery<IMdmSSOReponse, AxiosError>(
    ["dep_sso"],
    () => mdmAPI.initiateMDMAppleSSO(query),
    {
      enabled: clickedLogin || query.initiator !== "setup_experience",
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    }
  );

  if (query.initiator === "setup_experience") {
    return (
      <AuthenticationFormWrapper header={t("mdmSSO.authRequired")}>
        <div className={`${baseClass} form`}>
          <p>{t("mdmSSO.orgRequiresAuth")}</p>
          <Button
            className={`${baseClass}__sso-btn`}
            type="button"
            title={t("mdmSSO.ssoTitle")}
            onClick={() => setClickedLogin(true)}
            isLoading={clickedLogin}
          >
            <div>{t("mdmSSO.signIn")}</div>
          </Button>
          <p className={`${baseClass}__transparency-link`}>
            <CustomLink
              text={t("mdmSSO.whyLink")}
              url="https://fleetdm.com/better"
              newTab
            />
          </p>
        </div>
      </AuthenticationFormWrapper>
    );
  }

  return <div className={baseClass}>{error ? <SSOError /> : <Spinner />}</div>;
};

export default DEPSSOLoginPage;
