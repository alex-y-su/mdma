import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { IInputFieldParseTarget } from "interfaces/form_field";
import {
  HOST_STATUS_WEBHOOK_HOST_PERCENTAGE_DROPDOWN_OPTIONS,
  HOST_STATUS_WEBHOOK_WINDOW_DROPDOWN_OPTIONS,
} from "utilities/constants";
import { getCustomDropdownOptions } from "utilities/helpers";

import HostStatusWebhookPreviewModal from "pages/admin/components/HostStatusWebhookPreviewModal";

import SettingsSection from "pages/admin/components/SettingsSection";
import PageDescription from "components/PageDescription";
import Button from "components/buttons/Button";
import Checkbox from "components/forms/fields/Checkbox";
// @ts-ignore
import Dropdown from "components/forms/fields/Dropdown";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
import validUrl from "components/forms/validators/valid_url";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

import { IAppConfigFormProps } from "../../../OrgSettingsPage/cards/constants";

interface IGlobalHostStatusWebhookFormData {
  enableHostStatusWebhook: boolean;
  destination_url?: string;
  hostStatusWebhookHostPercentage: number;
  hostStatusWebhookWindow: number;
}

interface IGlobalHostStatusWebhookFormErrors {
  destination_url?: string;
}

const baseClass = "app-config-form";

const GlobalHostStatusWebhook = ({
  appConfig,
  handleSubmit,
  isUpdatingSettings,
}: IAppConfigFormProps): JSX.Element => {
  const { t } = useTranslation("settings");
  const gitOpsModeEnabled = appConfig.gitops.gitops_mode_enabled;
  const [
    showHostStatusWebhookPreviewModal,
    setShowHostStatusWebhookPreviewModal,
  ] = useState(false);
  const [formData, setFormData] = useState<IGlobalHostStatusWebhookFormData>({
    enableHostStatusWebhook:
      appConfig.webhook_settings.host_status_webhook
        ?.enable_host_status_webhook || false,
    destination_url:
      appConfig.webhook_settings.host_status_webhook?.destination_url || "",
    hostStatusWebhookHostPercentage:
      appConfig.webhook_settings.host_status_webhook?.host_percentage || 1,
    hostStatusWebhookWindow:
      appConfig.webhook_settings.host_status_webhook?.days_count || 1,
  });

  const {
    enableHostStatusWebhook,
    destination_url,
    hostStatusWebhookHostPercentage,
    hostStatusWebhookWindow,
  } = formData;

  const [
    formErrors,
    setFormErrors,
  ] = useState<IGlobalHostStatusWebhookFormErrors>({});

  const onInputChange = ({ name, value }: IInputFieldParseTarget) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors: IGlobalHostStatusWebhookFormErrors = {};

    if (enableHostStatusWebhook) {
      if (!destination_url) {
        errors.destination_url = t("integrations.hostStatusWebhook.validation.urlRequired");
      } else if (!validUrl({ url: destination_url })) {
        errors.destination_url = t("integrations.hostStatusWebhook.validation.urlInvalid", { url: destination_url });
      }
    }

    setFormErrors(errors);
  };

  useEffect(() => {
    validateForm();
  }, [enableHostStatusWebhook]);

  const toggleHostStatusWebhookPreviewModal = () => {
    setShowHostStatusWebhookPreviewModal(!showHostStatusWebhookPreviewModal);
    return false;
  };

  const onFormSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // Formatting of API not UI
    const formDataToSubmit = {
      webhook_settings: {
        host_status_webhook: {
          enable_host_status_webhook: enableHostStatusWebhook,
          destination_url,
          host_percentage: hostStatusWebhookHostPercentage,
          days_count: hostStatusWebhookWindow,
        },
        failing_policies_webhook:
          appConfig.webhook_settings.failing_policies_webhook,
        vulnerabilities_webhook:
          appConfig.webhook_settings.vulnerabilities_webhook,
      },
    };

    handleSubmit(formDataToSubmit);
  };

  const percentageHostsOptions = useMemo(
    () =>
      getCustomDropdownOptions(
        HOST_STATUS_WEBHOOK_HOST_PERCENTAGE_DROPDOWN_OPTIONS,
        hostStatusWebhookHostPercentage,
        (val) => `${val}%`
      ),
    // intentionally omit dependency so options only computed initially
    []
  );

  const windowOptions = useMemo(
    () =>
      getCustomDropdownOptions(
        HOST_STATUS_WEBHOOK_WINDOW_DROPDOWN_OPTIONS,
        hostStatusWebhookWindow,
        (val) => `${val} day${val !== 1 ? "s" : ""}`
      ),
    // intentionally omit dependency so options only computed initially
    []
  );
  return (
    <div className={baseClass}>
      <SettingsSection title={t("integrations.hostStatusWebhook.title")}>
        <PageDescription
          variant="right-panel"
          content={t("integrations.hostStatusWebhook.description")}
        />
        <form className={baseClass} onSubmit={onFormSubmit} autoComplete="off">
          <div
            className={`form ${
              gitOpsModeEnabled ? "disabled-by-gitops-mode" : ""
            }`}
          >
            <Checkbox
              onChange={onInputChange}
              name="enableHostStatusWebhook"
              value={enableHostStatusWebhook}
              parseTarget
            >
              {t("integrations.hostStatusWebhook.enable")}
            </Checkbox>
            <p className={`${baseClass}__section-description`}>
              {t("integrations.hostStatusWebhook.triggerDescription")}
            </p>
            <Button
              type="button"
              variant="inverse"
              onClick={toggleHostStatusWebhookPreviewModal}
            >
              {t("integrations.hostStatusWebhook.previewRequest")}
            </Button>
            {enableHostStatusWebhook && (
              <>
                <InputField
                  placeholder="https://server.com/example"
                  label={t("integrations.hostStatusWebhook.destinationUrl")}
                  onChange={onInputChange}
                  name="destination_url"
                  value={destination_url}
                  parseTarget
                  onBlur={validateForm}
                  error={formErrors.destination_url}
                  tooltip={t("integrations.hostStatusWebhook.destinationUrlTooltip")}
                />
                <Dropdown
                  label={t("integrations.hostStatusWebhook.percentageOfHosts")}
                  options={percentageHostsOptions}
                  onChange={onInputChange}
                  name="hostStatusWebhookHostPercentage"
                  value={hostStatusWebhookHostPercentage}
                  parseTarget
                  searchable={false}
                  onBlur={validateForm}
                  tooltip={t("integrations.hostStatusWebhook.percentageTooltip")}
                />
                <Dropdown
                  label={t("integrations.hostStatusWebhook.numberOfDays")}
                  options={windowOptions}
                  onChange={onInputChange}
                  name="hostStatusWebhookWindow"
                  value={hostStatusWebhookWindow}
                  parseTarget
                  searchable={false}
                  onBlur={validateForm}
                  tooltip={t("integrations.hostStatusWebhook.daysTooltip")}
                />
              </>
            )}
          </div>
          <GitOpsModeTooltipWrapper
            tipOffset={-8}
            renderChildren={(disableChildren) => (
              <Button
                type="submit"
                disabled={Object.keys(formErrors).length > 0 || disableChildren}
                className="button-wrap"
                isLoading={isUpdatingSettings}
              >
                {t("integrations.hostStatusWebhook.save")}
              </Button>
            )}
          />
        </form>
      </SettingsSection>
      {showHostStatusWebhookPreviewModal && (
        <HostStatusWebhookPreviewModal
          toggleModal={toggleHostStatusWebhookPreviewModal}
        />
      )}
    </div>
  );
};

export default GlobalHostStatusWebhook;
