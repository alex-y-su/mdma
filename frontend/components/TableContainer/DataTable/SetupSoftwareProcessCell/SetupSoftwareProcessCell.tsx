import SoftwareIcon from "pages/SoftwarePage/components/icons/SoftwareIcon";
import React from "react";
import { useTranslation } from "react-i18next";

const baseClass = "setup-software-process-cell";

interface ISetupSoftwareProcessCell {
  name: string;
}

const SetupSoftwareProcessCell = ({ name }: ISetupSoftwareProcessCell) => {
  const { t } = useTranslation("common");

  return (
    <span className={baseClass}>
      <SoftwareIcon name={name || ""} size="small" />
      <div>
        {t("setupProcess.install")}{" "}
        <b>{name || t("setupProcess.unknownSoftware")}</b>
      </div>
    </span>
  );
};

export default SetupSoftwareProcessCell;
