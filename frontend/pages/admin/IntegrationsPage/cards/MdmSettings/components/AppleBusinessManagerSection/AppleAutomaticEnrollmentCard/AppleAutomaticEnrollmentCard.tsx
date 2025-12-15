import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Icon from "components/Icon/Icon";

import SectionCard from "../../SectionCard";

interface IAppleAutomaticEnrollmentCardProps {
  isAppleMdmOn: boolean;
  viewDetails: () => void;
  configured?: boolean;
}

const AppleAutomaticEnrollmentCard = ({
  isAppleMdmOn,
  viewDetails,
  configured,
}: IAppleAutomaticEnrollmentCardProps) => {
  const { t } = useTranslation("settings");

  const AppleMdmDisabledCard = (
    <SectionCard header={t("mdmSettings.abm.appleEnrollmentCard.disabledHeader")}>
      {t("mdmSettings.abm.appleEnrollmentCard.disabledMessage")}
    </SectionCard>
  );

  const AbmConfiguredCard = (
    <SectionCard
      iconName="success"
      cta={
        <Button onClick={viewDetails} variant="inverse">
          <Icon name="pencil" />
          {t("mdmSettings.abm.appleEnrollmentCard.edit")}
        </Button>
      }
    >
      {t("mdmSettings.abm.appleEnrollmentCard.configuredMessage")}
    </SectionCard>
  );

  const AbmNotConfiguredCard = (
    <SectionCard
      header={t("mdmSettings.abm.appleEnrollmentCard.notConfiguredHeader")}
      cta={
        <Button className="add-abm-button" onClick={viewDetails}>
          {t("mdmSettings.abm.appleEnrollmentCard.addAbm")}
        </Button>
      }
    >
      {t("mdmSettings.abm.appleEnrollmentCard.notConfiguredMessage")}
    </SectionCard>
  );

  if (!isAppleMdmOn) {
    return AppleMdmDisabledCard;
  }

  return configured ? AbmConfiguredCard : AbmNotConfiguredCard;
};

export default AppleAutomaticEnrollmentCard;
