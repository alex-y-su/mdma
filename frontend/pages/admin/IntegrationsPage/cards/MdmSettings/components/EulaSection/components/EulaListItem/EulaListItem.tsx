import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

import endpoints from "utilities/endpoints";
import { IEulaMetadataResponse } from "services/entities/mdm";

import Icon from "components/Icon";
import Button from "components/buttons/Button";
import Graphic from "components/Graphic";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

const baseClass = "eula-list-item";

interface IEulaListItemProps {
  eulaData: IEulaMetadataResponse;
  onDelete: () => void;
}

const EulaListItem = ({ eulaData, onDelete }: IEulaListItemProps) => {
  const { t } = useTranslation("settings");

  const onOpenEula = () => {
    window.open(`/api${endpoints.MDM_EULA(eulaData.token)}`, "_blank");
  };

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__value-group ${baseClass}__list-item-data`}>
        <Graphic name="file-pdf" />
        <div className={`${baseClass}__list-item-info`}>
          <span className={`${baseClass}__list-item-name`}>
            {eulaData.name}
          </span>
          <span className={`${baseClass}__list-item-uploaded`}>
            {t("integrations.eula.uploaded_ago", {
              timeAgo: formatDistanceToNow(new Date(eulaData.created_at))
            })}
          </span>
        </div>
      </div>

      <div
        className={`${baseClass}__value-group ${baseClass}__list-item-actions`}
      >
        <Button
          className={`${baseClass}__list-item-button`}
          variant="icon"
          onClick={onOpenEula}
        >
          <Icon
            name="external-link"
            size="medium"
            className={`${baseClass}__external-icon`}
          />
        </Button>
        <GitOpsModeTooltipWrapper
          renderChildren={(disableChildren) => (
            <Button
              className={`${baseClass}__list-item-button`}
              variant="icon"
              onClick={() => onDelete()}
              disabled={disableChildren}
            >
              <Icon name="trash" />
            </Button>
          )}
        />
      </div>
    </div>
  );
};

export default EulaListItem;
