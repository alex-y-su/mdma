import React from "react";
import { useTranslation } from "react-i18next";

import EmptyTable from "components/EmptyTable";
import Card from "components/Card";

const baseClass = "os-versions-empty-state";

const OSVersionsEmptyState = () => {
  const { t } = useTranslation("settings");
  return (
    <Card>
      <EmptyTable
        className={`${baseClass}__empty-table`}
        header={t("controls.osUpdates.empty.title")}
        info={
          <span>
            {t("controls.osUpdates.empty.description")}
          </span>
        }
      />
    </Card>
  );
};

export default OSVersionsEmptyState;
