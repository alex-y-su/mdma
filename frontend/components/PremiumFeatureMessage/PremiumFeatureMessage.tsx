import React from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import CustomLink from "components/CustomLink";
import Icon from "components/Icon";

interface IPremiumFeatureMessage {
  className?: string;
  /** Aligns premium message, default: centered */
  alignment?: "left";
}

const baseClass = "premium-feature-message-container";

const PremiumFeatureMessage = ({
  className,
  alignment,
}: IPremiumFeatureMessage) => {
  const { t } = useTranslation("common");
  const classes = classnames(
    baseClass,
    {
      [`${baseClass}__align-${alignment}`]: alignment !== undefined,
    },
    className
  );

  return (
    <div className={classes}>
      <div className="premium-feature-message">
        <Icon name="premium-feature" />
        <p>{t("premium.featureUnavailable")}</p>
        <div className="external-link-and-icon">
          <CustomLink
            url="https://fleetdm.com/upgrade"
            text={t("premium.learnMore")}
            newTab
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureMessage;
