import React from "react";
import { useTranslation } from "react-i18next";

import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import Card from "components/Card";
import Button from "components/buttons/Button";
import ProfileGraphic from "../ProfileGraphic";

const baseClass = "add-profile-card";

interface IAddProfileCardProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProfileCard = ({ setShowModal }: IAddProfileCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <Card color="grey" className={baseClass}>
      <div className={`${baseClass}__card--content-wrap`}>
        <ProfileGraphic
          baseClass={baseClass}
          title={t("controls.osSettings.customSettings.uploadProfile")}
          message={
            <>
              .mobileconfig and .json for macOS, iOS, and iPadOS.
              <br />
              .json for Android.
              <br />
              .xml for Windows.
            </>
          }
        />
        <GitOpsModeTooltipWrapper
          tipOffset={8}
          renderChildren={(disableChildren) => (
            <Button
              disabled={disableChildren}
              className={`${baseClass}__card--add-button`}
              type="button"
              onClick={() => setShowModal(true)}
            >
              {t("controls.osSettings.customSettings.addProfile")}
            </Button>
          )}
        />
      </div>
    </Card>
  );
};

export default AddProfileCard;
