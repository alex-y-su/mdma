import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "context/app";

import { DiskEncryptionStatus, MdmEnrollmentStatus } from "interfaces/mdm";
import { IOSSettings } from "interfaces/host";
import {
  HostPlatform,
  isDiskEncryptionSupportedLinuxPlatform,
} from "interfaces/platform";

import InfoBanner from "components/InfoBanner";
import CustomLink from "components/CustomLink";
import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";

const baseClass = "host-details-banners";

export interface IHostBannersBaseProps {
  macDiskEncryptionStatus: DiskEncryptionStatus | null | undefined;
  mdmEnrollmentStatus: MdmEnrollmentStatus | null;
  connectedToFleetMdm?: boolean;
  hostPlatform?: HostPlatform;
  // used to identify Fedora hosts, whose platform is "rhel"
  hostOsVersion?: string;
  /** Disk encryption setting status and detail, if any, that apply to this host (via a team or the "no team" team) */
  diskEncryptionOSSetting?: IOSSettings["disk_encryption"];
  /** Whether or not this host's disk is encrypted */
  diskIsEncrypted?: boolean;
  /** Whether or not Fleet has escrowed the host's disk encryption key */
  diskEncryptionKeyAvailable?: boolean;
}
/**
 * Handles the displaying of banners on the host details page
 */
const HostDetailsBanners = ({
  mdmEnrollmentStatus,
  hostPlatform,
  hostOsVersion,
  connectedToFleetMdm,
  macDiskEncryptionStatus,
  diskEncryptionOSSetting,
  diskIsEncrypted,
  diskEncryptionKeyAvailable,
}: IHostBannersBaseProps) => {
  const { t } = useTranslation("hosts");
  const { config } = useContext(AppContext);

  const isMdmUnenrolled = mdmEnrollmentStatus === "Off" || !mdmEnrollmentStatus;

  const showTurnOnMdmInfoBanner =
    hostPlatform === "darwin" &&
    isMdmUnenrolled &&
    config?.mdm.enabled_and_configured;

  const showMacDiskEncryptionUserActionRequired =
    config?.mdm.enabled_and_configured &&
    connectedToFleetMdm &&
    macDiskEncryptionStatus === "action_required";

  const actionRequiredBanner = (
    <div className={baseClass}>
      <InfoBanner color="yellow">
        {t("banners.diskEncryption.actionRequired")}
      </InfoBanner>
    </div>
  );

  if (showTurnOnMdmInfoBanner) {
    return (
      <div className={baseClass}>
        <InfoBanner color="yellow">
          {t("banners.turnOnMdm")}
        </InfoBanner>
      </div>
    );
  }
  if (showMacDiskEncryptionUserActionRequired) {
    return (
      <div className={baseClass}>
        <InfoBanner color="yellow">
          {t("banners.diskEncryption.macActionRequired")}
        </InfoBanner>
      </div>
    );
  }
  if (
    hostPlatform &&
    isDiskEncryptionSupportedLinuxPlatform(hostPlatform, hostOsVersion ?? "") &&
    diskEncryptionOSSetting?.status
  ) {
    // setting applies to a Linux host
    if (!diskIsEncrypted) {
      // linux host not in compliance with setting
      return (
        <div className={baseClass}>
          <InfoBanner
            color="yellow"
            cta={
              <CustomLink
                url={`${LEARN_MORE_ABOUT_BASE_LINK}/mdm-disk-encryption`}
                text={t("banners.diskEncryption.guide")}
                variant="banner-link"
                newTab
              />
            }
          >
            {t("banners.diskEncryption.linuxOffRequiresReinstall")}
          </InfoBanner>
        </div>
      );
    }
    if (!diskEncryptionKeyAvailable) {
      // linux host's disk is encrypted, but Fleet doesn't yet have a disk
      // encryption key escrowed (note that this state is also possible for Windows hosts, which we
      // don't show this banner for currently)
      return actionRequiredBanner;
    }
  }
  if (
    hostPlatform === "windows" &&
    diskEncryptionOSSetting?.status === "action_required"
  ) {
    return actionRequiredBanner;
  }

  return null;
};

export default HostDetailsBanners;
