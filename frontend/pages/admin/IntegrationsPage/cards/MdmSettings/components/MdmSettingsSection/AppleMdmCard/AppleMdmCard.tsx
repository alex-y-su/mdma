import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Icon from "components/Icon";
import DataError from "components/DataError";
import { AxiosError } from "axios";
import { IMdmApple } from "interfaces/mdm";
import SectionCard from "../../SectionCard";

const baseClass = "apple-mdm-card";

interface ITurnOnAppleMdmCardProps {
  onClickTurnOn: () => void;
}

const TurnOnAppleMdmCard = ({ onClickTurnOn }: ITurnOnAppleMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      className={baseClass}
      header={t("integrations.mdm.apple.turn_on_header")}
      cta={
        <Button onClick={onClickTurnOn}>
          {t("integrations.mdm.apple.turn_on")}
        </Button>
      }
    >
      {t("integrations.mdm.apple.turn_on_content")}
    </SectionCard>
  );
};

interface ITurnOffAppleMdmCardProps {
  onClickDetails: () => void;
}

const SeeDetailsAppleMdmCard = ({
  onClickDetails,
}: ITurnOffAppleMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      iconName="success"
      cta={
        <Button onClick={onClickDetails} variant="inverse">
          <Icon name="pencil" />
          {t("integrations.mdm.edit")}
        </Button>
      }
    >
      {t("integrations.mdm.apple.turned_on")}
    </SectionCard>
  );
};

interface IAppleMdmCardProps {
  appleAPNSInfo: IMdmApple | undefined;
  errorData: AxiosError | null;
  turnOnAppleMdm: () => void;
  viewDetails: () => void;
}

/**
 * This component is responsible for showing the correct UI for the Apple MDM card.
 * We pass in the appleAPNInfo and errorData from the MdmSettings component because
 * we need to make that API call higher up in the component tree to correctly show
 * loading states on the page.
 */
const AppleMdmCard = ({
  appleAPNSInfo,
  errorData,
  turnOnAppleMdm,
  viewDetails,
}: IAppleMdmCardProps) => {
  // The API returns an error if MDM is turned off or APNS is not configured yet.
  // If there is any other error we will show the DataError component.
  const showError =
    errorData !== null && errorData.status !== 404 && errorData.status !== 400;

  if (showError) {
    return <DataError />;
  }

  return appleAPNSInfo !== undefined ? (
    <SeeDetailsAppleMdmCard onClickDetails={viewDetails} />
  ) : (
    <TurnOnAppleMdmCard onClickTurnOn={turnOnAppleMdm} />
  );
};

export default AppleMdmCard;
