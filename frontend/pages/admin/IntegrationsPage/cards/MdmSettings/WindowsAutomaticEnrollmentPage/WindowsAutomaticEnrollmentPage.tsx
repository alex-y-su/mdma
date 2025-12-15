import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import { AppContext } from "context/app";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import BackButton from "components/BackButton";
import MainContent from "components/MainContent";
import CustomLink from "components/CustomLink/CustomLink";
import InfoBanner from "components/InfoBanner";
import Icon from "components/Icon";
import PageDescription from "components/PageDescription";

const generateMdmTermsOfUseUrl = (domain: string) => {
  return `${domain}/api/mdm/microsoft/tos`;
};

const generateMdmDiscoveryUrl = (domain: string) => {
  return `${domain}/api/mdm/microsoft/discovery`;
};

const baseClass = "windows-automatic-enrollment-page";

const WindowsAutomaticEnrollmentPage = () => {
  const { t } = useTranslation("settings");
  const { config } = useContext(AppContext);

  return (
    <MainContent className={baseClass}>
      <>
        <div className={`${baseClass}__header-links`}>
          <BackButton
            text={t("mdmSettings.windows.backToMdm")}
            path={PATHS.ADMIN_INTEGRATIONS_MDM}
            className={`${baseClass}__back-to-automatic-enrollment`}
          />
        </div>
        <h1>{t("mdmSettings.windows.entraPageTitle")}</h1>
        <PageDescription
          content={
            <>
              {t("mdmSettings.windows.entraDescription")}{" "}
              <CustomLink
                newTab
                text={t("mdmSettings.windows.learnMore")}
                url="https://fleetdm.com/learn-more-about/setup-windows-mdm"
              />
            </>
          }
        />
        <p>
          {t("mdmSettings.windows.entraWarning1")}
        </p>
        <p>
          {t("mdmSettings.windows.entraWarning2")}
        </p>
        {/* Ideally we'd use the native browser list styles and css to display
        the list numbers but this does not allow us to style the list items as we'd
        like so we write the numbers in the JSX instead. */}
        <ol className={`${baseClass}__setup-list`}>
          <li>
            <span>1.</span>
            <CustomLink
              newTab
              text={t("mdmSettings.windows.entraStep1")}
              url="https://fleetdm.com/sign-in-to/microsoft-automatic-enrollment-tool"
            />
          </li>
          <li>
            <span>2.</span>
            <p>
              {t("mdmSettings.windows.entraStep2")}
            </p>
          </li>
          <li>
            <span>3.</span>
            <div>
              <p>
                {t("mdmSettings.windows.entraStep3")}
              </p>
              <InfoBanner
                className={`${baseClass}__cloud-customer-banner`}
                color="purple"
                icon="warning"
              >
                <div className={`${baseClass}__banner-content`}>
                  <Icon name="error-outline" color="ui-fleet-black-75" />
                  <p>
                    {t("mdmSettings.windows.entraCloudBanner")}
                  </p>
                </div>
              </InfoBanner>
            </div>
          </li>
          <li>
            <span>4.</span>
            <p>
              {t("mdmSettings.windows.entraStep4")}
            </p>
          </li>
          <li>
            <span>5.</span>
            <p>
              {t("mdmSettings.windows.entraStep5")}
            </p>
          </li>
          <li>
            <span>6.</span>
            {t("mdmSettings.windows.entraStep6")}
          </li>
          <li>
            <span>7.</span>
            <div>
              <p>
                {t("mdmSettings.windows.entraStep7")}
              </p>
              <div className={`${baseClass}__url-inputs-wrapper`}>
                <InputField
                  inputWrapperClass={`${baseClass}__url-input`}
                  label={t("mdmSettings.windows.mdmTermsOfUseLabel")}
                  name="mdmTermsOfUseUrl"
                  tooltip={t("mdmSettings.windows.mdmTermsOfUseTooltip")}
                  value={generateMdmTermsOfUseUrl(
                    config?.server_settings.server_url || ""
                  )}
                  enableCopy
                />
                <InputField
                  inputWrapperClass={`${baseClass}__url-input`}
                  label={t("mdmSettings.windows.mdmDiscoveryLabel")}
                  name="mdmDiscoveryUrl"
                  tooltip={t("mdmSettings.windows.mdmDiscoveryTooltip")}
                  value={generateMdmDiscoveryUrl(
                    config?.server_settings.server_url || ""
                  )}
                  enableCopy
                />
              </div>
            </div>
          </li>
          <li>
            <span>8.</span>
            <p>
              {t("mdmSettings.windows.entraStep8")}
            </p>
          </li>
          <li>
            <span>9.</span>
            <p>
              {t("mdmSettings.windows.entraStep9")}
            </p>
          </li>
          <li>
            <span>10.</span>
            <p>
              {t("mdmSettings.windows.entraStep10")}
            </p>
          </li>
          <li>
            <span>11.</span>
            <p>
              {t("mdmSettings.windows.entraStep11")}
            </p>
          </li>
          <li>
            <span>12.</span>
            <p>
              {t("mdmSettings.windows.entraStep12")}
            </p>
          </li>
          <li>
            <span>13.</span>
            <div>
              {t("mdmSettings.windows.entraStep13")}
              <ul className={`${baseClass}__permissions-list`}>
                <li>{t("mdmSettings.windows.entraPermission1")}</li>
                <li>{t("mdmSettings.windows.entraPermission2")}</li>
                <li>{t("mdmSettings.windows.entraPermission3")}</li>
                <li>{t("mdmSettings.windows.entraPermission4")}</li>
                <li>{t("mdmSettings.windows.entraPermission5")}</li>
              </ul>
            </div>
          </li>
          <li>
            <span>14.</span>
            <p>
              {t("mdmSettings.windows.entraStep14")}
            </p>
          </li>
          <li>
            <span>15.</span>
            <p>
              {t("mdmSettings.windows.entraStep15")}
            </p>
          </li>
          <li>
            <span>16.</span>
            <p>
              {t("mdmSettings.windows.entraStep16")}
            </p>
          </li>
        </ol>
      </>
    </MainContent>
  );
};

export default WindowsAutomaticEnrollmentPage;
