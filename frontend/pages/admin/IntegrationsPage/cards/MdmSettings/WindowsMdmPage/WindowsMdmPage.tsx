import React, { useContext, useState } from "react";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import configAPI from "services/entities/config";
import { NotificationContext } from "context/notification";
import { AppContext } from "context/app";

import MainContent from "components/MainContent/MainContent";
import Button from "components/buttons/Button";
import BackButton from "components/BackButton";
import Slider from "components/forms/fields/Slider";
import Checkbox from "components/forms/fields/Checkbox";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import Radio from "components/forms/fields/Radio";
import CustomLink from "components/CustomLink";

import { getErrorMessage } from "./helpers";

const baseClass = "windows-mdm-page";

interface ISetWindowsMdmOptions {
  enableMdm: boolean;
  enableAutoMigration: boolean;
  enrollmentType: "automatic" | "manual" | null;
  router: InjectedRouter;
}

const useSetWindowsMdm = ({
  enableMdm,
  enableAutoMigration,
  enrollmentType,
  router,
}: ISetWindowsMdmOptions) => {
  const { t } = useTranslation("settings");
  const { setConfig } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const turnOnWindowsMdm = async () => {
    try {
      const updatedConfig = await configAPI.updateMDMConfig(
        {
          enable_turn_on_windows_mdm_manually:
            enrollmentType !== null && enrollmentType === "manual",
          windows_enabled_and_configured: enableMdm,
          windows_migration_enabled: enableAutoMigration,
        },
        true
      );
      setConfig(updatedConfig);
      renderFlash("success", t("mdmSettings.windows.updateSuccess"), {
        persistOnPageChange: true,
      });
    } catch (e) {
      renderFlash("error", getErrorMessage(e), {
        persistOnPageChange: true,
      });
    }

    router.push(PATHS.ADMIN_INTEGRATIONS_MDM);
  };

  return turnOnWindowsMdm;
};

interface IWindowsMdmPageProps {
  router: InjectedRouter;
}

const WindowsMdmPage = ({ router }: IWindowsMdmPageProps) => {
  const { t } = useTranslation("settings");
  const { config, isPremiumTier } = useContext(AppContext);
  const gitOpsModeEnabled = config?.gitops.gitops_mode_enabled;

  const [mdmOn, setMdmOn] = useState(
    config?.mdm?.windows_enabled_and_configured ?? false
  );
  const [autoMigration, setAutoMigration] = useState(
    config?.mdm?.windows_migration_enabled ?? false
  );
  const [enrollmentType, setEnrollmentType] = useState<
    "automatic" | "manual" | null
  >(() => {
    if (!config?.mdm?.windows_enabled_and_configured) return null;
    return config?.mdm?.enable_turn_on_windows_mdm_manually
      ? "manual"
      : "automatic";
  });

  const updateWindowsMdm = useSetWindowsMdm({
    enableMdm: mdmOn,
    enableAutoMigration: autoMigration,
    enrollmentType,
    router,
  });

  const onChangeMdmOn = () => {
    setMdmOn(!mdmOn);
    // if we are toggling off mdm we want to clear enrollment type. If we are toggling
    // it on, we want to set enrollment type to automatic by default
    !mdmOn ? setEnrollmentType("automatic") : setEnrollmentType(null);

    // if we are turning mdm off, also turn off auto migration
    mdmOn && setAutoMigration(false);
  };

  const onChangeEnrollmentType = (value: string) => {
    setAutoMigration(false);
    setEnrollmentType(value === "automaticEnrollment" ? "automatic" : "manual");
  };

  const onChangeAutoMigration = () => {
    setAutoMigration(!autoMigration);
  };

  const onSaveMdm = () => {
    updateWindowsMdm();
  };

  const descriptionText = mdmOn
    ? t("mdmSettings.windows.descriptionOn")
    : t("mdmSettings.windows.descriptionOff");

  return (
    <MainContent className={baseClass}>
      <>
        <div className={`${baseClass}__header-links`}>
          <BackButton
            text={t("mdmSettings.windows.backToMdm")}
            path={PATHS.ADMIN_INTEGRATIONS_MDM}
            className={`${baseClass}__back-to-mdm`}
          />
        </div>
        <h1>{t("mdmSettings.windows.pageTitle")}</h1>
        <form>
          <Slider
            value={mdmOn}
            activeText={t("mdmSettings.windows.sliderOn")}
            inactiveText={t("mdmSettings.windows.sliderOff")}
            onChange={onChangeMdmOn}
            disabled={gitOpsModeEnabled}
          />
          {!isPremiumTier && <p>{descriptionText}</p>}
          {isPremiumTier && (
            // NOTE: first time using fieldset and legend. if we use this more we should make
            // a reusable component
            <fieldset
              disabled={!mdmOn}
              className={`${baseClass}__enrollment-type-fieldset form-field`}
            >
              {/* NOTE: we use this wrapper div to style the legend since legend
               does not work well with flexbox. the wrapper div helps the gap styling apply. */}
              <div>
                <legend className="form-field__label">
                  {t("mdmSettings.windows.endUserExperience")}
                </legend>
              </div>
              <Radio
                id="automatic-enrollment"
                label={t("mdmSettings.windows.automaticLabel")}
                value="automaticEnrollment"
                name="enrollmentType"
                checked={enrollmentType === "automatic"}
                onChange={onChangeEnrollmentType}
                disabled={!mdmOn}
                helpText={t("mdmSettings.windows.automaticHelp")}
              />
              <Radio
                id="manual-enrollment"
                label={t("mdmSettings.windows.manualLabel")}
                value="manualEnrollment"
                name="enrollmentType"
                checked={enrollmentType === "manual"}
                onChange={onChangeEnrollmentType}
                disabled={!mdmOn}
                helpText={
                  <>
                    {t("mdmSettings.windows.manualHelpRequires")}{" "}
                    <CustomLink
                      text={t("mdmSettings.windows.manualHelpLink")}
                      url={
                        PATHS.ADMIN_INTEGRATIONS_AUTOMATIC_ENROLLMENT_WINDOWS
                      }
                    />{" "}
                    {t("mdmSettings.windows.manualHelpEnd")}
                  </>
                }
              />
            </fieldset>
          )}
          {isPremiumTier && enrollmentType !== "manual" && (
            <Checkbox
              disabled={!mdmOn || gitOpsModeEnabled}
              value={autoMigration}
              onChange={onChangeAutoMigration}
            >
              {t("mdmSettings.windows.autoMigrate")}
            </Checkbox>
          )}
          <GitOpsModeTooltipWrapper
            tipOffset={8}
            renderChildren={(disableChildren) => (
              <Button onClick={onSaveMdm} disabled={disableChildren}>
                {t("mdmSettings.windows.saveButton")}
              </Button>
            )}
          />
        </form>
      </>
    </MainContent>
  );
};

export default WindowsMdmPage;
