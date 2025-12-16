import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Icon from "components/Icon/Icon";
import SectionCard from "../../SectionCard";

interface IWindowsAutomaticEnrollmentCardProps {
  viewDetails: () => void;
}

const WindowsAutomaticEnrollmentCard = ({
  viewDetails,
}: IWindowsAutomaticEnrollmentCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      header={t("mdmSettings.windows.enrollmentCard.header")}
      cta={
        <Button onClick={viewDetails} variant="inverse" iconStroke>
          {t("mdmSettings.windows.enrollmentCard.details")}{" "}
          <Icon name="chevron-right" color="ui-fleet-black-75" />
        </Button>
      }
    >
      {t("mdmSettings.windows.enrollmentCard.description")}
    </SectionCard>
  );
};

export default WindowsAutomaticEnrollmentCard;
