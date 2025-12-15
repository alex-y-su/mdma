import React from "react";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink";
import InfoBanner from "components/InfoBanner";

const baseClass = "vpp-renewal-message";

interface IVppRenewalMessageProps {
  expired: boolean;
}

const VppRenewalMessage = ({ expired }: IVppRenewalMessageProps) => {
  const { t } = useTranslation("common");

  return (
    <InfoBanner
      className={baseClass}
      color="yellow"
      cta={
        <CustomLink
          url="/settings/integrations/mdm/vpp"
          text={t("vpp.renewButton")}
          className={`${baseClass}`}
          variant="banner-link"
        />
      }
    >
      {expired
        ? t("vpp.expiredMessage")
        : t("vpp.expiringMessage")}
    </InfoBanner>
  );
};

export default VppRenewalMessage;
