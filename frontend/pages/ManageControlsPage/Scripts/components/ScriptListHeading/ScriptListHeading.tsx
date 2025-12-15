import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "components/buttons/Button";
import Icon from "components/Icon";

const baseClass = "script-list-heading";

interface IScriptListHeading {
  onClickAddScript: () => void;
}

const ScriptListHeading = ({ onClickAddScript }: IScriptListHeading) => {
  const { t } = useTranslation("settings");
  return (
    <div className={baseClass}>
      <span className={`${baseClass}__heading-title`}>{t("controls.scripts.title")}</span>
      <span className={`${baseClass}__heading-actions`}>
        <GitOpsModeTooltipWrapper
          position="left"
          renderChildren={(disableChildren) => (
            <Button
              disabled={disableChildren}
              variant="brand-inverse-icon"
              className={`${baseClass}__add-button`}
              onClick={onClickAddScript}
              iconStroke
            >
              <>
                <Icon name="plus" color="core-fleet-green" />
                {t("controls.scripts.addScript")}
              </>
            </Button>
          )}
        />
      </span>
    </div>
  );
};

export default ScriptListHeading;
