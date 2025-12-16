import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import Button from "components/buttons/Button";
import Icon from "components/Icon";

import SectionCard from "../../SectionCard";

const baseClass = "android-mdm-card";

interface ITurnOnAndroidMdmCardProps {
  onClickTurnOn: () => void;
}

const TurnOnAndroidMdmCard = ({
  onClickTurnOn,
}: ITurnOnAndroidMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      className={baseClass}
      header={t("integrations.mdm.android.turn_on_header")}
      cta={
        <Button onClick={onClickTurnOn}>
          {t("integrations.mdm.android.turn_on")}
        </Button>
      }
    >
      {t("integrations.mdm.android.turn_on_content")}
    </SectionCard>
  );
};

interface ITurnOffAndroidMdmCardProps {
  onClickEdit: () => void;
}

const TurnOffAndroidMdmCard = ({
  onClickEdit,
}: ITurnOffAndroidMdmCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      className={baseClass}
      iconName="success"
      cta={
        <Button onClick={onClickEdit} variant="inverse">
          <Icon name="pencil" />
          {t("integrations.mdm.edit")}
        </Button>
      }
    >
      {t("integrations.mdm.android.turned_on")}
    </SectionCard>
  );
};

interface IAndroidMdmCardProps {
  turnOffAndroidMdm: () => void;
  editAndroidMdm: () => void;
}

const AndroidMdmCard = ({
  turnOffAndroidMdm,
  editAndroidMdm,
}: IAndroidMdmCardProps) => {
  const { isAndroidMdmEnabledAndConfigured } = useContext(AppContext);

  if (isAndroidMdmEnabledAndConfigured === undefined) {
    return null;
  }

  return isAndroidMdmEnabledAndConfigured ? (
    <TurnOffAndroidMdmCard onClickEdit={editAndroidMdm} />
  ) : (
    <TurnOnAndroidMdmCard onClickTurnOn={turnOffAndroidMdm} />
  );
};

export default AndroidMdmCard;
