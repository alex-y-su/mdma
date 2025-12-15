import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import Icon from "components/Icon";
import Button from "components/buttons/Button";
import React from "react";
import { useTranslation } from "react-i18next";

const baseClass = "profile-list-heading";

interface IProfileListHeadingProps {
  onClickAddProfile?: () => void;
}

const ProfileListHeading = ({
  onClickAddProfile,
}: IProfileListHeadingProps) => {
  const { t } = useTranslation("settings");

  return (
    <div className={baseClass}>
      <span className={`${baseClass}__profile-name-heading`}>
        Configuration profile
      </span>
      <span className={`${baseClass}__actions-heading`}>
        <GitOpsModeTooltipWrapper
          position="left"
          renderChildren={(disableChildren) => (
            <Button
              disabled={disableChildren}
              variant="brand-inverse-icon"
              className={`${baseClass}__add-button`}
              onClick={onClickAddProfile}
              iconStroke
            >
              <>
                <Icon name="plus" color="core-fleet-green" />
                {t("controls.osSettings.customSettings.addProfile")}
              </>
            </Button>
          )}
        />
      </span>
    </div>
  );
};

export default ProfileListHeading;
