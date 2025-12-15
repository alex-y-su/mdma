import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import Icon from "components/Icon";

const baseClass = "cert-authority-list-header";

interface ICertAuthorityListHeaderProps {
  onClickAddCertAuthority: () => void;
}

const CertAuthorityListHeader = ({
  onClickAddCertAuthority,
}: ICertAuthorityListHeaderProps) => {
  const { t } = useTranslation("settings");

  return (
    <div className={baseClass}>
      <span className={`${baseClass}__name`}>{t("certificateAuthorities.header.title")}</span>
      <span className={`${baseClass}__actions`}>
        <GitOpsModeTooltipWrapper
          position="left"
          renderChildren={(disableChildren) => (
            <Button
              disabled={disableChildren}
              variant="inverse"
              className={`${baseClass}__add-button`}
              onClick={onClickAddCertAuthority}
              iconStroke
            >
              <>
                <Icon name="plus" />
                {t("certificateAuthorities.header.addButton")}
              </>
            </Button>
          )}
        />
      </span>
    </div>
  );
};

export default CertAuthorityListHeader;
