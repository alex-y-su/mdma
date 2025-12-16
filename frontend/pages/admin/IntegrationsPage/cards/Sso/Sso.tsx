import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IInputFieldParseTarget } from "interfaces/form_field";

import SettingsSection from "pages/admin/components/SettingsSection";
import Button from "components/buttons/Button";
import Checkbox from "components/forms/fields/Checkbox";
import CustomLink from "components/CustomLink";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
import validUrl from "components/forms/validators/valid_url";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import TabText from "components/TabText";
import TabNav from "components/TabNav";
import PATHS from "router/paths";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";
import { IAppConfigFormProps } from "../../../OrgSettingsPage/cards/constants";
import EndUserAuthSection from "../IdentityProviders/components/EndUserAuthSection";
import {
  IFormDataIdp,
  newFormDataIdp,
} from "../IdentityProviders/components/EndUserAuthSection/helpers";

const baseClass = "app-config-form";

interface ISsoFormData {
  idpName: string;
  enableSso: boolean;
  entityId: string;
  idpImageUrl: string;
  metadata: string;
  metadataUrl: string;
  enableSsoIdpLogin: boolean;
  enableJitProvisioning: boolean;
}

interface ISsoFormErrors {
  idp_image_url?: string | null;
  metadata?: string | null;
  metadata_url?: string | null;
  entity_id?: string | null;
  idp_name?: string | null;
}

const validate = (formData: ISsoFormData, t: any) => {
  const errors: ISsoFormErrors = {};

  const {
    enableSso,
    idpImageUrl,
    metadata,
    metadataUrl,
    entityId,
    idpName,
  } = formData;

  if (enableSso) {
    if (idpImageUrl && !validUrl({ url: idpImageUrl })) {
      errors.idp_image_url = t("settings:integrations.sso.errors.invalid_url", {
        url: idpImageUrl,
      });
    }

    if (!metadata) {
      if (!metadataUrl) {
        errors.metadata_url = t(
          "settings:integrations.sso.errors.metadata_url_required"
        );
        errors.metadata = t(
          "settings:integrations.sso.errors.metadata_required"
        );
      } else if (
        !validUrl({ url: metadataUrl, protocols: ["http", "https"] })
      ) {
        errors.metadata_url = t(
          "settings:integrations.sso.errors.invalid_url",
          { url: metadataUrl }
        );
      }
    }

    if (!entityId) {
      errors.entity_id = t(
        "settings:integrations.sso.errors.entity_id_required"
      );
    }

    if (!idpName) {
      errors.idp_name = t("settings:integrations.sso.errors.idp_name_required");
    }
  }

  return errors;
};

export const AUTH_TARGETS_BY_INDEX = ["fleet-users", "end-users"];

const Sso = ({
  appConfig,
  handleSubmit,
  isPremiumTier,
  isUpdatingSettings,
  router,
  subsection,
}: IAppConfigFormProps): JSX.Element => {
  const { t } = useTranslation("settings");
  const gitOpsModeEnabled = appConfig.gitops.gitops_mode_enabled;
  const selectedAuthTarget = subsection as string;

  const [formData, setFormData] = useState<ISsoFormData>({
    enableSso: appConfig.sso_settings?.enable_sso ?? false,
    idpName: appConfig.sso_settings?.idp_name ?? "",
    entityId: appConfig.sso_settings?.entity_id ?? "",
    idpImageUrl: appConfig.sso_settings?.idp_image_url ?? "",
    metadata: appConfig.sso_settings?.metadata ?? "",
    metadataUrl: appConfig.sso_settings?.metadata_url ?? "",
    enableSsoIdpLogin: appConfig.sso_settings?.enable_sso_idp_login ?? false,
    enableJitProvisioning:
      appConfig.sso_settings?.enable_jit_provisioning ?? false,
  });

  const {
    enableSso,
    idpName,
    entityId,
    idpImageUrl,
    metadata,
    metadataUrl,
    enableSsoIdpLogin,
    enableJitProvisioning,
  } = formData;

  const originalFormData = useRef(formData);

  const [formErrors, setFormErrors] = useState<ISsoFormErrors>({});
  const [formDirty, setFormDirty] = useState<boolean>(false);

  const onInputChange = ({ name, value }: IInputFieldParseTarget) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    const newErrs = validate(newFormData, t);
    // only set errors that are updates of existing errors
    // new errors are only set onBlur or submit
    const errsToSet: Record<string, string> = {};
    Object.keys(formErrors).forEach((k) => {
      // @ts-ignore
      if (newErrs[k]) {
        // @ts-ignore
        errsToSet[k] = newErrs[k];
      }
    });
    setFormErrors(errsToSet);
    setFormDirty(true);
  };

  const onInputBlur = () => {
    setFormErrors(validate(formData, t));
  };

  const onFormSubmit = async (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const errs = validate(formData, t);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    // Formatting of API not UI
    const formDataToSubmit = {
      sso_settings: {
        entity_id: entityId?.trim(),
        idp_image_url: idpImageUrl?.trim(),
        metadata: metadata?.trim(),
        metadata_url: metadataUrl?.trim(),
        idp_name: idpName?.trim(),
        enable_sso: enableSso,
        enable_sso_idp_login: enableSsoIdpLogin,
        enable_jit_provisioning: enableJitProvisioning,
        issuer_uri: appConfig.sso_settings?.issuer_uri ?? "",
        enable_jit_role_sync:
          appConfig.sso_settings?.enable_jit_role_sync ?? false,
      },
    };

    if (await handleSubmit(formDataToSubmit)) {
      setFormDirty(false);
      originalFormData.current = { ...formData };
    }
  };

  const [endUserFormData, setEndUserFormData] = useState<IFormDataIdp>(
    newFormDataIdp(appConfig?.mdm?.end_user_authentication)
  );
  const originalEndUserFormData = useRef(endUserFormData);

  const handleTabChange = useCallback(
    (index: number) => {
      if (
        formDirty &&
        // eslint-disable-next-line no-alert
        !confirm(t("integrations.sso.confirm_switch_tabs"))
      ) {
        return;
      }

      setFormDirty(false);
      setFormData(originalFormData.current);
      setEndUserFormData(originalEndUserFormData.current);
      const newSubsection = AUTH_TARGETS_BY_INDEX[index];
      router.push(
        newSubsection === "end-users"
          ? PATHS.ADMIN_INTEGRATIONS_SSO_END_USERS
          : PATHS.ADMIN_INTEGRATIONS_SSO_FLEET_USERS
      );
    },
    [formDirty, router, t]
  );

  const renderFleetSsoTab = () => {
    return (
      <form onSubmit={onFormSubmit} autoComplete="off">
        {/* "form" class applies global form styling to fields for free */}
        <div
          className={`form ${
            gitOpsModeEnabled ? "disabled-by-gitops-mode" : ""
          }`}
        >
          <Checkbox
            onChange={onInputChange}
            onBlur={onInputBlur}
            name="enableSso"
            value={enableSso}
            parseTarget
          >
            {t("integrations.sso.enable_sso")}
          </Checkbox>
          <InputField
            label={t("integrations.sso.idp_name_label")}
            onChange={onInputChange}
            name="idpName"
            value={idpName}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors.idp_name}
            tooltip={t("integrations.sso.idp_name_tooltip")}
          />
          <InputField
            label={t("integrations.sso.entity_id_label")}
            helpText={t("integrations.sso.entity_id_help")}
            onChange={onInputChange}
            name="entityId"
            value={entityId}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors.entity_id}
            tooltip={t("integrations.sso.entity_id_tooltip")}
          />
          <InputField
            label={t("integrations.sso.idp_image_url_label")}
            onChange={onInputChange}
            name="idpImageUrl"
            value={idpImageUrl}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors.idp_image_url}
            tooltip={t("integrations.sso.idp_image_url_tooltip")}
          />
          <InputField
            label={t("integrations.sso.metadata_label")}
            type="textarea"
            onChange={onInputChange}
            name="metadata"
            value={metadata}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors.metadata}
            tooltip={t("integrations.sso.metadata_tooltip")}
          />
          <InputField
            label={t("integrations.sso.metadata_url_label")}
            helpText={t("integrations.sso.metadata_url_help")}
            onChange={onInputChange}
            name="metadataUrl"
            value={metadataUrl}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors.metadata_url}
            tooltip={t("integrations.sso.metadata_url_tooltip")}
          />
          <Checkbox
            onChange={onInputChange}
            onBlur={onInputBlur}
            name="enableSsoIdpLogin"
            value={enableSsoIdpLogin}
            parseTarget
          >
            {t("integrations.sso.allow_idp_login")}
          </Checkbox>
          {isPremiumTier && (
            <Checkbox
              onChange={onInputChange}
              onBlur={onInputBlur}
              name="enableJitProvisioning"
              value={enableJitProvisioning}
              parseTarget
              helpText={
                <>
                  <CustomLink
                    url={`${LEARN_MORE_ABOUT_BASE_LINK}/just-in-time-provisioning`}
                    text={t("integrations.sso.learn_more")}
                    newTab
                  />{" "}
                  {t("integrations.sso.jit_help_text")}
                </>
              }
            >
              {t("integrations.sso.jit_provisioning")}
            </Checkbox>
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
              {t("common:save")}
            </Button>
          )}
        />
      </form>
    );
  };

  const onSubmitEndUserSso = async () => {
    // Notify parent component that it needs to re-fetch app config.
    // No formUpdates needed because changes are made inside the card.
    await handleSubmit({});
  };

  const renderEndUserSsoTab = () => (
    <EndUserAuthSection
      setDirty={setFormDirty}
      formData={endUserFormData}
      setFormData={setEndUserFormData}
      originalFormData={originalEndUserFormData}
      onSubmit={onSubmitEndUserSso}
    />
  );

  return (
    <SettingsSection title={t("integrations.sso.title")}>
      <TabNav secondary>
        <Tabs
          selectedIndex={AUTH_TARGETS_BY_INDEX.indexOf(selectedAuthTarget)}
          onSelect={handleTabChange}
        >
          <TabList>
            <Tab>
              <TabText>{t("integrations.sso.fleet_users")}</TabText>
            </Tab>
            <Tab>
              <TabText>{t("integrations.sso.end_users")}</TabText>
            </Tab>
          </TabList>
          <TabPanel key="fleet-users">{renderFleetSsoTab()}</TabPanel>
          <TabPanel key="end-users">{renderEndUserSsoTab()}</TabPanel>
        </Tabs>
      </TabNav>
    </SettingsSection>
  );
};

export default Sso;
