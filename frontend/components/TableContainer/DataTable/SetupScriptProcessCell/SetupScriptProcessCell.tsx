import Graphic from "components/Graphic/Graphic";
import React from "react";
import { useTranslation } from "react-i18next";

const baseClass = "setup-script-process-cell";

interface ISetupScriptProcessCell {
  name: string;
}

const SetupScriptProcessCell = ({ name }: ISetupScriptProcessCell) => {
  const { t } = useTranslation("common");

  return (
    <span className={baseClass}>
      <Graphic name="file-sh" className={`${baseClass}__icon`} />
      <div>
        {t("setupProcess.run")} <b>{name || t("setupProcess.unknownScript")}</b>
      </div>
    </span>
  );
};

export default SetupScriptProcessCell;
