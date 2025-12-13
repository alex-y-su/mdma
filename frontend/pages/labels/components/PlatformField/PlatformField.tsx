import React from "react";
import { noop } from "lodash";
import { useTranslation } from "react-i18next";

// @ts-ignore
import Dropdown from "components/forms/fields/Dropdown";
import FormField from "components/forms/FormField";

const baseClass = "platform-field";

interface IPlatformFieldProps {
  platform: string;
  isEditing?: boolean;
  onChange?: (platform: string) => void;
}

const PlatformField = ({
  platform,
  isEditing = false,
  onChange = noop,
}: IPlatformFieldProps) => {
  const { t } = useTranslation();

  const PLATFORM_STRINGS: { [key: string]: string } = {
    darwin: t("labels:platforms.macos"),
    windows: t("labels:platforms.windows"),
    ubuntu: t("labels:platforms.ubuntu"),
    centos: t("labels:platforms.centos"),
  };

  const platformOptions = [
    { label: t("labels:platforms.all"), value: "" },
    { label: t("labels:platforms.macos"), value: "darwin" },
    { label: t("labels:platforms.windows"), value: "windows" },
    { label: t("labels:platforms.ubuntu"), value: "ubuntu" },
    { label: t("labels:platforms.centos"), value: "centos" },
  ];

  return (
    <div className={baseClass}>
      {!isEditing ? (
        <div className="form-field form-field--dropdown">
          <Dropdown
            label={t("labels:form.platform")}
            name="platform"
            onChange={onChange}
            value={platform}
            options={platformOptions}
            classname={`${baseClass}__platform-dropdown`}
            wrapperClassName={`${baseClass}__form-field ${baseClass}__form-field--platform`}
          />
        </div>
      ) : (
        <FormField
          label={t("labels:form.platform")}
          name="platform"
          helpText={t("labels:form.platformImmutable")}
        >
          <>
            <p>
              {platform
                ? PLATFORM_STRINGS[platform]
                : t("labels:platforms.all")}
            </p>
          </>
        </FormField>
      )}
    </div>
  );
};

export default PlatformField;
