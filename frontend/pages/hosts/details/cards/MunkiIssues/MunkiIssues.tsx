import React from "react";
import { useTranslation } from "react-i18next";

import { IMunkiIssue } from "interfaces/host";

import TableContainer from "components/TableContainer";
import EmptyTable from "components/EmptyTable";
import Card from "components/Card";
import CardHeader from "components/CardHeader";

import { munkiIssuesTableHeaders } from "./MunkiIssuesTableConfig";

const baseClass = "munki-issues-card";

interface IMunkiIssuesTableProps {
  isLoading: boolean;
  munkiIssues?: IMunkiIssue[];
  deviceType?: string;
}

const MunkiIssuesTable = ({
  isLoading,
  munkiIssues,
  deviceType,
}: IMunkiIssuesTableProps): JSX.Element => {
  const { t } = useTranslation();
  const tableMunkiIssues = munkiIssues;
  const tableHeaders = munkiIssuesTableHeaders;

  return (
    <Card className={baseClass} borderRadiusSize="xxlarge" paddingSize="xlarge">
      <CardHeader header={t("hosts:munkiIssues.title")} />
      {munkiIssues?.length ? (
        <div className={deviceType || ""}>
          <TableContainer
            columnConfigs={tableHeaders}
            data={tableMunkiIssues || []}
            isLoading={isLoading}
            defaultSortHeader="name"
            defaultSortDirection="asc"
            resultsTitle="issue"
            emptyComponent={() => (
              <EmptyTable
                header={t("hosts:munkiIssues.noIssuesDetected")}
                info={t("hosts:munkiIssues.noIssuesInfo")}
              />
            )}
            showMarkAllPages={false}
            isAllPagesSelected={false}
            isClientSidePagination
          />
        </div>
      ) : (
        <EmptyTable
          header={t("hosts:munkiIssues.noIssuesDetected")}
          info={t("hosts:munkiIssues.noIssuesInfo")}
        />
      )}
    </Card>
  );
};
export default MunkiIssuesTable;
