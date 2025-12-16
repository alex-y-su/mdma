import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { InjectedRouter } from "react-router";
import classnames from "classnames";

import isURL from "validator/lib/isURL";

import PATHS from "router/paths";

import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";

import { getErrorReason } from "interfaces/errors";

import configAPI from "services/entities/config";

import SettingsSection from "pages/admin/components/SettingsSection";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Radio from "components/forms/fields/Radio/Radio";
import Slider from "components/forms/fields/Slider/Slider";
import Button from "components/buttons/Button/Button";
import SectionHeader from "components/SectionHeader";
import PremiumFeatureMessage from "components/PremiumFeatureMessage/PremiumFeatureMessage";
import EmptyTable from "components/EmptyTable/EmptyTable";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

import ExampleWebhookUrlPayloadModal from "../ExampleWebhookUrlPayloadModal/ExampleWebhookUrlPayloadModal";

import MdmMigrationVideo from "../../../../../../../../assets/videos/mdm-migration-video.mp4";

const baseClass = "end-user-migration-section";

interface IEndUserMigrationFormData {
  isEnabled: boolean;
  mode: "voluntary" | "forced";
  webhookUrl: string;
}

interface IEndUserMigrationSectionProps {
  router: InjectedRouter;
}

const validateWebhookUrl = (val: string) => {
  return isURL(val, {
    protocols: ["http", "https"],
    require_protocol: true,
    require_valid_protocol: true,
  });
};

const EndUserMigrationSection = ({ router }: IEndUserMigrationSectionProps) => {
  const { t } = useTranslation("settings");
  const { config, isPremiumTier, setConfig } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const [formData, setFormData] = useState<IEndUserMigrationFormData>({
    isEnabled: config?.mdm.macos_migration.enable || false,
    mode: config?.mdm.macos_migration.mode || "voluntary",
    webhookUrl: config?.mdm.macos_migration.webhook_url || "",
  });
  const [showExamplePayload, setShowExamplePayload] = useState(false);

  // we only validate this one input so just going to use simple boolean to
  // track validation. If we need to validate more inputs in the future we can
  // use a formErrors object.
  const [isValidWebhookUrl, setIsValidWebhookUrl] = useState(true);

  const toggleExamplePayloadModal = () => {
    setShowExamplePayload(!showExamplePayload);
  };

  const toggleMigrationEnabled = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      isEnabled: !prevFormData.isEnabled,
    }));
  };

  const onClickConnect = () => {
    router.push(PATHS.ADMIN_INTEGRATIONS_MDM);
  };

  const onChangeMode = (mode: string) => {
    // typecast to "voluntary" | "forced" as we know the value is either one of those.
    // TODO: typing the radio component onChange value argument to be specific string defined
    // by the `value` prop instead of a generic string.
    const newMode = mode as "voluntary" | "forced";
    setFormData((prevFormData) => ({ ...prevFormData, mode: newMode }));
  };

  const onChangeWebhookUrl = (webhookUrl: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, webhookUrl }));
    setIsValidWebhookUrl(validateWebhookUrl(webhookUrl));
  };

  const onSubmit = async (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();

    if (formData.isEnabled && !validateWebhookUrl(formData.webhookUrl)) {
      setIsValidWebhookUrl(false);
      return;
    }

    try {
      const updatedConfig = await configAPI.update({
        mdm: {
          macos_migration: {
            enable: formData.isEnabled,
            mode: formData.mode,
            webhook_url: formData.webhookUrl,
          },
        },
      });
      renderFlash("success", t("mdmSettings.endUserMigration.updateSuccess"));
      setConfig(updatedConfig);
    } catch (err) {
      if (
        getErrorReason(err, {
          nameEquals: "macos_migration.webhook_url",
        })
      ) {
        setIsValidWebhookUrl(false);
        return;
      }
      renderFlash("error", t("mdmSettings.endUserMigration.updateError"));
    }
  };

  const isGitOpsModeEnabled = config?.gitops.gitops_mode_enabled;

  const formClasses = classnames(`${baseClass}__end-user-migration-form`, {
    disabled: !formData.isEnabled || isGitOpsModeEnabled,
  });

  if (!isPremiumTier) {
    return (
      <div className={baseClass}>
        <SectionHeader title={t("mdmSettings.endUserMigration.title")} />
        <PremiumFeatureMessage />
      </div>
    );
  }

  if (!config?.mdm.apple_bm_enabled_and_configured) {
    return (
      <div className={baseClass}>
        <SectionHeader title={t("mdmSettings.endUserMigration.title")} />
        <EmptyTable
          className={`${baseClass}__abm-connect-message`}
          header={t("mdmSettings.endUserMigration.connectHeader")}
          info={t("mdmSettings.endUserMigration.connectInfo")}
          primaryButton={
            <Button onClick={onClickConnect}>
              {t("mdmSettings.endUserMigration.connect")}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <SettingsSection
      className={baseClass}
      title={t("mdmSettings.endUserMigration.title")}
    >
      <form>
        <p>{t("mdmSettings.endUserMigration.description")}</p>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={MdmMigrationVideo}
          className={`${baseClass}__preview-video`}
          controls
          autoPlay
          loop
          muted
        />
        <Slider
          value={formData.isEnabled}
          onChange={toggleMigrationEnabled}
          activeText={t("mdmSettings.endUserMigration.enabled")}
          inactiveText={t("mdmSettings.endUserMigration.disabled")}
          disabled={isGitOpsModeEnabled}
        />
        <div className={`form ${formClasses}`}>
          <div className={`form-field ${baseClass}__mode-field`}>
            <div className="form-field__label">
              {t("mdmSettings.endUserMigration.mode")}
            </div>
            <Radio
              disabled={!formData.isEnabled || isGitOpsModeEnabled}
              checked={formData.mode === "voluntary"}
              value="voluntary"
              id="voluntary"
              label={t("mdmSettings.endUserMigration.voluntary")}
              onChange={onChangeMode}
              className={`${baseClass}__voluntary-radio`}
              name="mode-type"
            />
            <Radio
              disabled={!formData.isEnabled || isGitOpsModeEnabled}
              checked={formData.mode === "forced"}
              value="forced"
              id="forced"
              label={t("mdmSettings.endUserMigration.forced")}
              onChange={onChangeMode}
              className={`${baseClass}__forced-radio`}
              name="mode-type"
            />
          </div>
          <p>
            {formData.mode === "voluntary"
              ? t("mdmSettings.endUserMigration.voluntaryDescription")
              : t("mdmSettings.endUserMigration.forcedDescription")}
          </p>
          <p>{t("mdmSettings.endUserMigration.editOrgInfo")}</p>
          <InputField
            readOnly={!formData.isEnabled || isGitOpsModeEnabled}
            name="webhook_url"
            label={t("mdmSettings.endUserMigration.webhookUrl")}
            value={formData.webhookUrl}
            onChange={onChangeWebhookUrl}
            error={
              !isValidWebhookUrl &&
              t("mdmSettings.endUserMigration.validation.validUrl")
            }
            helpText={t("mdmSettings.endUserMigration.webhookUrlHelp")}
          />
        </div>
        <Button
          className={`${baseClass}__preview-button`}
          variant="inverse"
          onClick={toggleExamplePayloadModal}
        >
          {t("mdmSettings.endUserMigration.previewPayload")}
        </Button>
        <GitOpsModeTooltipWrapper
          tipOffset={8}
          renderChildren={(disableChildren) => (
            <Button onClick={onSubmit} disabled={disableChildren}>
              {t("mdmSettings.endUserMigration.save")}
            </Button>
          )}
        />
      </form>
      {showExamplePayload && (
        <ExampleWebhookUrlPayloadModal onCancel={toggleExamplePayloadModal} />
      )}
    </SettingsSection>
  );
};

export default EndUserMigrationSection;
