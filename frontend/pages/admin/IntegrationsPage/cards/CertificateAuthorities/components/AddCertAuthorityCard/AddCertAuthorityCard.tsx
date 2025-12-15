import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Card from "components/Card";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

const baseClass = "add-cert-authority-card";

interface IAddCertAuthoityCardProps {
  onAddCertAuthority: () => void;
}

const AddCertAuthorityCard = ({
  onAddCertAuthority,
}: IAddCertAuthoityCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <Card paddingSize="xxlarge" className={baseClass}>
      <div className={`${baseClass}__content`}>
        <p className={`${baseClass}__title`}>
          {t("certificateAuthorities.addCard.title")}
        </p>
        <p>{t("certificateAuthorities.addCard.description")}</p>
      </div>
      <GitOpsModeTooltipWrapper
        renderChildren={(disableChildren) => (
          <Button
            disabled={disableChildren}
            className={`${baseClass}__button`}
            onClick={onAddCertAuthority}
          >
            {t("certificateAuthorities.addCard.button")}
          </Button>
        )}
      />
    </Card>
  );
};

export default AddCertAuthorityCard;
