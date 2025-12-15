import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useState,
} from "react";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

import { expandErrorReasonRequired } from "interfaces/errors";
import configAPI from "services/entities/config";
import { NotificationContext } from "context/notification";
import { AppContext } from "context/app";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import Button from "components/buttons/Button/Button";
import TooltipWrapper from "components/TooltipWrapper";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import PremiumFeatureMessage from "components/PremiumFeatureMessage";

import {
  IFormDataIdp,
  IFormErrorsIdp,
  isMissingAnyRequiredField,
  validateFormDataIdp,
} from "./helpers";

const baseClass = "end-user-auth-section";

export interface IEndUserAuthSectionProps {
  setDirty: (dirty: boolean) => void;
  formData: IFormDataIdp;
  setFormData: React.Dispatch<React.SetStateAction<IFormDataIdp>>;
  originalFormData: MutableRefObject<IFormDataIdp>;
  onSubmit: () => void;
}

const EndUserAuthSection = ({
  setDirty,
  formData,
  setFormData,
  originalFormData,
  // Notify parent component of changes, since we're calling our own API
  // rather than using the common config update handler.
  onSubmit: announceChanges,
}: IEndUserAuthSectionProps) => {
  const { t } = useTranslation("settings");
  const { config, isPremiumTier } = useContext(AppContext);
  const gitOpsModeEnabled = config?.gitops.gitops_mode_enabled;

  const { renderFlash } = useContext(NotificationContext);
  const [formErrors, setFormErrors] = useState<IFormErrorsIdp | null>(null);

  const enableSaveButton =
    // TODO: it seems like we should allow saving an empty form so that the user can clear their IdP info
    // isEmptyFormData(formData) ||
    !isMissingAnyRequiredField(formData) && !formErrors;

  const onInputChange = useCallback(
    ({ name, value }: { name: keyof IFormDataIdp; value: string }) => {
      const newData = { ...formData, [name]: value?.trim() || "" };
      setFormData(newData);
      setDirty(true);

      const newErrors = validateFormDataIdp(newData);
      if (!newErrors) {
        // don't wait for onBlur to clear form errors if there are no new errors
        setFormErrors(null);
      } else if (formErrors?.[name] && !newErrors[name]) {
        // don't wait for onBlur to update error on this field
        setFormErrors(newErrors);
      } else if (name === "metadata") {
        // FIXME: See comment to InputField component regarding onBlur prop for textarea. For now,
        // this check just always updates form errors whenever metadata field changes because
        // onBlur doesn't currently work for textareas.
        setFormErrors(newErrors);
      }
    },
    [formData, setFormData, formErrors, setDirty]
  );

  const onBlur = useCallback(() => {
    setFormErrors(validateFormDataIdp(formData));
  }, [formData]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<SubmitEvent>) => {
      e.preventDefault();
      const newErrors = validateFormDataIdp(formData);
      if (newErrors) {
        setFormErrors(newErrors);
        return;
      }

      try {
        await configAPI.update({
          mdm: {
            end_user_authentication: {
              ...formData,
            },
          },
        });
        renderFlash("success", t("integrations.end_user_auth.success"));
        originalFormData.current = { ...formData };
        setDirty(false);
        // Notify parent component of changes, since we're calling our own API
        // rather than using the common config update handler.
        announceChanges();
      } catch (err) {
        const ae = (typeof err === "object" ? err : {}) as AxiosResponse;
        if (ae.status === 422) {
          renderFlash(
            "error",
            t("integrations.end_user_auth.error_with_reason", { reason: expandErrorReasonRequired(err) })
          );
          return;
        }
        renderFlash("error", t("integrations.end_user_auth.error"));
      }
    },
    [formData, renderFlash, setDirty, t]
  );

  const renderContent = () => {
    if (!isPremiumTier) {
      return <PremiumFeatureMessage />;
    }

    return (
      <form>
        <p>
          {t("integrations.end_user_auth.description")}
        </p>
        <div
          className={`form ${
            gitOpsModeEnabled ? "disabled-by-gitops-mode" : ""
          }`}
        >
          <InputField
            label={t("integrations.end_user_auth.idp_name_label")}
            onChange={onInputChange}
            onBlur={onBlur}
            name="idp_name"
            value={formData.idp_name}
            parseTarget
            error={formErrors?.idp_name}
            tooltip={t("integrations.end_user_auth.idp_name_tooltip")}
          />
          <InputField
            label={t("integrations.end_user_auth.entity_id_label")}
            onChange={onInputChange}
            onBlur={onBlur}
            name="entity_id"
            value={formData.entity_id}
            parseTarget
            error={formErrors?.entity_id}
            tooltip={t("integrations.end_user_auth.entity_id_tooltip")}
          />
          <InputField
            label={t("integrations.end_user_auth.metadata_url_label")}
            helpText={t("integrations.end_user_auth.metadata_url_help")}
            onChange={onInputChange}
            onBlur={onBlur}
            name="metadata_url"
            value={formData.metadata_url}
            parseTarget
            error={formErrors?.metadata_url}
            tooltip={t("integrations.end_user_auth.metadata_url_tooltip")}
          />
          <InputField
            label={t("integrations.end_user_auth.metadata_label")}
            type="textarea"
            onChange={onInputChange}
            name="metadata"
            value={formData.metadata}
            parseTarget
            error={formErrors?.metadata}
            tooltip={t("integrations.end_user_auth.metadata_tooltip")}
          />
        </div>
        <GitOpsModeTooltipWrapper
          tipOffset={-8}
          renderChildren={(disableChildren) => (
            <TooltipWrapper
              tipContent={t("integrations.end_user_auth.save_tooltip")}
              disableTooltip={enableSaveButton || disableChildren}
              underline={false}
            >
              <Button
                disabled={!enableSaveButton || disableChildren}
                onClick={onSubmit}
                className="button-wrap"
              >
                {t("common:save")}
              </Button>
            </TooltipWrapper>
          )}
        />
      </form>
    );
  };

  return <div className={baseClass}>{renderContent()}</div>;
};

export default EndUserAuthSection;
