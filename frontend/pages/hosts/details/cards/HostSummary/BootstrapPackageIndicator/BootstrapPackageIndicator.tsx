import React from "react";
import { useTranslation } from "react-i18next";

import { BootstrapPackageStatus } from "interfaces/mdm";

import Icon from "components/Icon";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";

const baseClass = "bootstrap-package-indicator";

interface IBootstrapPackageIndicatorProps {
  status: BootstrapPackageStatus;
  onClick?: () => void;
}

const BootstrapPackageIndicator = ({
  status,
  onClick,
}: IBootstrapPackageIndicatorProps) => {
  const { t } = useTranslation("hosts");

  const STATUS_DISPLAY_OPTIONS = {
    installed: {
      iconName: "success" as const,
      displayText: t("bootstrapPackage.installed"),
      tipContent: (
        <span className={`${baseClass}__tooltip`}>
          {t("bootstrapPackage.installedTooltip")}
        </span>
      ),
    },
    pending: {
      iconName: "pending" as const,
      displayText: t("bootstrapPackage.pending"),
      tipContent: (
        <span className={`${baseClass}__tooltip`}>
          {t("bootstrapPackage.pendingTooltip")}
        </span>
      ),
    },
    failed: {
      iconName: "error" as const,
      displayText: t("bootstrapPackage.failed"),
      tipContent: (
        <span className={`${baseClass}__tooltip`}>
          {t("bootstrapPackage.failedTooltip")}{" "}
          <b>{t("bootstrapPackage.failed")}</b>.
        </span>
      ),
    },
  };

  const displayData = STATUS_DISPLAY_OPTIONS[status];

  return (
    <div className={baseClass}>
      <Icon name={displayData.iconName} />
      <span>
        <TooltipWrapper
          position="top"
          showArrow
          tipContent={displayData.tipContent}
          underline={false}
        >
          {status !== BootstrapPackageStatus.FAILED ? (
            <>{displayData.displayText}</>
          ) : (
            <Button
              onClick={onClick}
              variant="inverse"
              className={`${baseClass}__button`}
            >
              {displayData.displayText}
            </Button>
          )}
        </TooltipWrapper>
      </span>
    </div>
  );
};

export default BootstrapPackageIndicator;
