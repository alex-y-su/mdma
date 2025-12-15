import React from "react";
import { useTranslation } from "react-i18next";

const TooltipInnerContentActionRequired = (props: {
  isDeviceUser: boolean;
  profileName: string;
}) => {
  const { t } = useTranslation("hosts");
  const { isDeviceUser, profileName } = props;
  const instructions = profileName ? (
    <>
      <b>{profileName}</b> {t("osSettingsModal.actionRequired.instructions")}
    </>
  ) : (
    <>{t("osSettingsModal.actionRequired.instructions")}</>
  );

  if (isDeviceUser) {
    return (
      <>
        {t("osSettingsModal.actionRequired.followThe")} {instructions}
        <br />
        {t("osSettingsModal.actionRequired.onYour")} <b>{t("osSettingsModal.actionRequired.myDevice")}</b> {t("osSettingsModal.actionRequired.page")}.
      </>
    );
  }

  return (
    <>
      {t("osSettingsModal.actionRequired.askEndUser")} {instructions} {t("osSettingsModal.actionRequired.onTheir")} <b>{t("osSettingsModal.actionRequired.myDevice")}</b>{" "}
      {t("osSettingsModal.actionRequired.page")}.
    </>
  );
};

export default TooltipInnerContentActionRequired;
