import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import Button from "components/buttons/Button";
import Icon from "components/Icon";
import SectionCard from "../../SectionCard";

const baseClass = "windows-mdm-card";

interface ITurnOnWindowsMdmCardProps {
  onClickTurnOn: () => void;
}

const TurnOnWindowsMdmCard = ({
  onClickTurnOn,
}: ITurnOnWindowsMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      className={baseClass}
      header={t("integrations.mdm.windows.turn_on_header")}
      cta={
        <Button onClick={onClickTurnOn}>
          {t("integrations.mdm.windows.turn_on")}
        </Button>
      }
    >
      {t("integrations.mdm.windows.turn_on_content")}
    </SectionCard>
  );
};

interface ITurnOffWindowsMdmCardProps {
  onClickEdit: () => void;
}

const TurnOffWindowsMdmCard = ({
  onClickEdit,
}: ITurnOffWindowsMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      iconName="success"
      cta={
        <Button onClick={onClickEdit} variant="inverse">
          <Icon name="pencil" />
          {t("integrations.mdm.edit")}
        </Button>
      }
    >
      {t("integrations.mdm.windows.turned_on")}
    </SectionCard>
  );
};

interface IWindowsMdmCardProps {
  turnOnWindowsMdm: () => void;
  editWindowsMdm: () => void;
}

const WindowsMdmCard = ({
  turnOnWindowsMdm,
  editWindowsMdm,
}: IWindowsMdmCardProps) => {
  const { config } = useContext(AppContext);

  const isWindowsMdmEnabled =
    config?.mdm?.windows_enabled_and_configured ?? false;

  return isWindowsMdmEnabled ? (
    <TurnOffWindowsMdmCard onClickEdit={editWindowsMdm} />
  ) : (
    <TurnOnWindowsMdmCard onClickTurnOn={turnOnWindowsMdm} />
  );
};

export default WindowsMdmCard;
