import Button from "components/buttons/Button";
import Icon from "components/Icon";
import React from "react";
import { useTranslation } from "react-i18next";

const baseClass = "info-button";

interface IInfoButton {
  onClick: () => void;
}

const InfoButton = ({ onClick }: IInfoButton) => {
  const { t } = useTranslation("hosts");
  return (
    <Button className={baseClass} onClick={onClick} variant="inverse">
      <>
        {t("deviceUser.infoButton")} <Icon name="info" size="small" />
      </>
    </Button>
  );
};

export default InfoButton;
