import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { useQuery } from "react-query";

import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";

import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";

import configAPI from "services/entities/config";

import { IConfig } from "interfaces/config";
import { IInputFieldParseTarget } from "interfaces/form_field";
import { getErrorReason } from "interfaces/errors";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Checkbox from "components/forms/fields/Checkbox";
import validUrl from "components/forms/validators/valid_url";
import TooltipWrapper from "components/TooltipWrapper";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink";
import SectionHeader from "components/SectionHeader";
import PageDescription from "components/PageDescription";
import Spinner from "components/Spinner";
import DataError from "components/DataError";
import PremiumFeatureMessage from "components/PremiumFeatureMessage";
import SettingsSection from "pages/admin/components/SettingsSection";

const baseClass = "change-management";

interface IChangeManagementFormData {
  gitOpsModeEnabled: boolean;
  repoURL: string;
}

interface IChangeManagementFormErrors {
  repository_url?: string | null;
}

const validate = (formData: IChangeManagementFormData, t: any) => {
  const errs: IChangeManagementFormErrors = {};
  const { gitOpsModeEnabled, repoURL } = formData;
  if (gitOpsModeEnabled) {
    if (!repoURL) {
      errs.repository_url = t("integrations.changeManagement.validation.repoUrlRequired");
    } else if (!validUrl({ url: repoURL, protocols: ["http", "https"] })) {
      errs.repository_url = t("integrations.changeManagement.validation.repoUrlProtocol");
    }
  }
  return errs;
};

const ChangeManagement = () => {
  const { t } = useTranslation("settings");
  const { setConfig } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const [formData, setFormData] = useState<IChangeManagementFormData>({
    // dummy 0 values, will be populated with fresh config API response
    gitOpsModeEnabled: false,
    repoURL: "",
  });
  const [formErrors, setFormErrors] = useState<IChangeManagementFormErrors>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const { isLoading: isLoadingConfig, error: isLoadingConfigError } = useQuery<
    IConfig,
    Error,
    IConfig
  >(["integrations"], () => configAPI.loadAll(), {
    onSuccess: (data) => {
      const {
        gitops: {
          gitops_mode_enabled: gitOpsModeEnabled,
          repository_url: repoURL,
        },
      } = data;
      setFormData({ gitOpsModeEnabled, repoURL });
      setConfig(data);
    },
  });

  const { isPremiumTier } = useContext(AppContext);

  if (!isPremiumTier)
    return (
      <SettingsSection title={t("integrations.changeManagement.title")}>
        <PremiumFeatureMessage />
      </SettingsSection>
    );

  const { gitOpsModeEnabled, repoURL } = formData;

  if (isLoadingConfig) {
    return <Spinner />;
  }
  if (isLoadingConfigError) {
    return <DataError />;
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const errs = validate(formData, t);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setIsUpdating(true);
    try {
      const updatedConfig = await configAPI.update({
        gitops: {
          gitops_mode_enabled: formData.gitOpsModeEnabled,
          repository_url: formData.repoURL,
        },
      });

      setFormData({
        gitOpsModeEnabled: updatedConfig.gitops.gitops_mode_enabled,
        repoURL: updatedConfig.gitops.repository_url,
      });

      setConfig(updatedConfig);

      renderFlash("success", t("integrations.changeManagement.updateSuccess"));
    } catch (e) {
      const message = getErrorReason(e);
      renderFlash("error", message || t("integrations.changeManagement.updateError"));
    } finally {
      setIsUpdating(false);
    }
  };

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
  };

  const onInputBlur = () => {
    setFormErrors(validate(formData, t));
  };

  return (
    <div className={baseClass}>
      <SectionHeader title={t("integrations.changeManagement.title")} />
      <PageDescription
        content={
          <>
            {t("integrations.changeManagement.description")}{" "}
            <CustomLink
              newTab
              url={`${LEARN_MORE_ABOUT_BASE_LINK}/gitops`}
              text={t("integrations.changeManagement.learnMore")}
            />
          </>
        }
        variant="right-panel"
      />
      <form onSubmit={handleSubmit}>
        <Checkbox
          onChange={onInputChange}
          name="gitOpsModeEnabled"
          value={gitOpsModeEnabled}
          parseTarget
        >
          <TooltipWrapper tipContent={t("integrations.changeManagement.gitOpsModeTooltip")}>
            {t("integrations.changeManagement.enableGitOpsMode")}
          </TooltipWrapper>
        </Checkbox>
        {/* Git repository URL */}
        <InputField
          label={t("integrations.changeManagement.repoUrl")}
          onChange={onInputChange}
          name="repoURL"
          value={repoURL}
          parseTarget
          onBlur={onInputBlur}
          error={formErrors.repository_url}
          helpText={t("integrations.changeManagement.repoUrlHelp")}
          disabled={!gitOpsModeEnabled}
        />
        <div className="button-wrap">
          <Button
            type="submit"
            disabled={!!Object.keys(formErrors).length}
            isLoading={isUpdating}
          >
            {t("integrations.changeManagement.save")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangeManagement;
