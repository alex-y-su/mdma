import React from "react";
import { useTranslation } from "react-i18next";

import InfoBanner from "components/InfoBanner";
import Button from "components/buttons/Button";
import { MacDiskEncryptionActionRequired } from "interfaces/host";
import { IHostBannersBaseProps } from "pages/hosts/details/HostDetailsPage/components/HostDetailsBanners/HostDetailsBanners";
import CustomLink from "components/CustomLink";
import { isDiskEncryptionSupportedLinuxPlatform } from "interfaces/platform";

const baseClass = "device-user-banners";

interface IDeviceUserBannersProps extends IHostBannersBaseProps {
  mdmEnabledAndConfigured: boolean;
  diskEncryptionActionRequired: MacDiskEncryptionActionRequired | null;
  mdmManualEnrolmentUrl?: string;
  onClickCreatePIN: () => void;
  onClickTurnOnMdm: () => void;
  onTriggerEscrowLinuxKey: () => void;
}

const DeviceUserBanners = ({
  hostPlatform,
  hostOsVersion,
  mdmEnrollmentStatus,
  mdmEnabledAndConfigured,
  connectedToFleetMdm,
  macDiskEncryptionStatus,
  diskEncryptionActionRequired,
  mdmManualEnrolmentUrl,
  onClickCreatePIN,
  onClickTurnOnMdm,
  diskEncryptionOSSetting,
  diskIsEncrypted,
  diskEncryptionKeyAvailable,
  onTriggerEscrowLinuxKey,
}: IDeviceUserBannersProps) => {
  const { t } = useTranslation("hosts");
  const isMdmUnenrolled =
    mdmEnrollmentStatus === "Off" || mdmEnrollmentStatus === null;

  const mdmEnabledAndConnected = mdmEnabledAndConfigured && connectedToFleetMdm;

  const showTurnOnAppleMdmBanner =
    hostPlatform === "darwin" && isMdmUnenrolled && mdmEnabledAndConfigured;

  const showMacDiskEncryptionKeyResetRequired =
    mdmEnabledAndConnected &&
    macDiskEncryptionStatus === "action_required" &&
    diskEncryptionActionRequired === "rotate_key";

  const turnOnMdmButton = mdmManualEnrolmentUrl ? (
    <CustomLink
      url={mdmManualEnrolmentUrl}
      text={t("deviceUser.banners.turnOnMdm")}
      newTab
      variant="banner-link"
    />
  ) : (
    <Button variant="text-link-dark" onClick={onClickTurnOnMdm}>
      {t("deviceUser.banners.turnOnMdm")}
    </Button>
  );

  const renderBanner = () => {
    if (showTurnOnAppleMdmBanner) {
      return (
        <InfoBanner color="yellow" cta={turnOnMdmButton}>
          {t("deviceUser.banners.mdmOff")}
        </InfoBanner>
      );
    }

    if (showMacDiskEncryptionKeyResetRequired) {
      return (
        <InfoBanner color="yellow">
          {t("deviceUser.banners.diskEncryptionRotateKey")}
        </InfoBanner>
      );
    }

    // setting applies to a supported Linux host
    if (
      hostPlatform &&
      isDiskEncryptionSupportedLinuxPlatform(
        hostPlatform,
        hostOsVersion ?? ""
      ) &&
      diskEncryptionOSSetting?.status
    ) {
      // host not in compliance with setting
      if (!diskIsEncrypted) {
        // banner 1
        return (
          <InfoBanner
            cta={
              <CustomLink
                url="https://fleetdm.com/learn-more-about/encrypt-linux-device"
                text={t("banners.diskEncryption.guide")}
                variant="banner-link"
              />
            }
            color="yellow"
          >
            {t("deviceUser.banners.linuxEncryptDevice")}
          </InfoBanner>
        );
      }
      // host disk is encrypted, so in compliance with the setting
      if (!diskEncryptionKeyAvailable) {
        // key is not escrowed: banner 3
        return (
          <InfoBanner
            cta={
              <Button
                variant="inverse"
                onClick={onTriggerEscrowLinuxKey}
                className="create-key-button"
              >
                {t("deviceUser.banners.createKey")}
              </Button>
            }
            color="yellow"
          >
            {t("deviceUser.banners.linuxCreateKey")}
          </InfoBanner>
        );
      }
    }

    if (
      hostPlatform === "windows" &&
      diskEncryptionOSSetting?.status === "action_required"
    ) {
      return (
        <InfoBanner
          color="yellow"
          cta={
            <Button variant="text-link-dark" onClick={onClickCreatePIN}>
              {t("deviceUser.banners.createPin")}
            </Button>
          }
        >
          {t("deviceUser.banners.windowsCreatePin")}
        </InfoBanner>
      );
    }

    return null;
  };

  const banner = renderBanner();
  return banner ? <div className={baseClass}>{banner}</div> : null;
};

export default DeviceUserBanners;
