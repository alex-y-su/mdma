import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Icon from "components/Icon";

import SectionCard from "../../SectionCard";

const baseClass = "vpp-card";

interface IVppCardProps {
  isAppleMdmOn: boolean;
  isVppOn: boolean;
  viewDetails: () => void;
}

const VppCard = ({ isAppleMdmOn, isVppOn, viewDetails }: IVppCardProps) => {
  const { t } = useTranslation("settings");

  const AppleMdmDisabledCard = (
    <SectionCard header={t("mdmSettings.vpp.disabledHeader")}>
      {t("mdmSettings.vpp.disabledMessage")}
    </SectionCard>
  );

  const VppOnCard = (
    <SectionCard
      iconName="success"
      cta={
        <Button onClick={viewDetails} variant="inverse">
          <Icon name="pencil" />
          {t("mdmSettings.vpp.edit")}
        </Button>
      }
    >
      {t("mdmSettings.vpp.enabledMessage")}
    </SectionCard>
  );

  const VppOffCard = (
    <SectionCard
      header={t("mdmSettings.vpp.header")}
      cta={
        <Button
          className={`${baseClass}__add-vpp-button`}
          onClick={viewDetails}
        >
          {t("mdmSettings.vpp.addVpp")}
        </Button>
      }
    >
      {t("mdmSettings.vpp.offMessage")}
    </SectionCard>
  );

  if (!isAppleMdmOn) {
    return AppleMdmDisabledCard;
  }

  return isVppOn ? VppOnCard : VppOffCard;
};

export default VppCard;
