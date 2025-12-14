import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InjectedRouter } from "react-router";
import { Row } from "react-table";

import { isAndroid } from "interfaces/platform";
import { IHostPolicy } from "interfaces/policy";
import { SUPPORT_LINK } from "utilities/constants";
import TableContainer from "components/TableContainer";
import EmptyTable from "components/EmptyTable";
import CardHeader from "components/CardHeader";
import CustomLink from "components/CustomLink";

import {
  generatePolicyTableHeaders,
  generatePolicyDataSet,
} from "./HostPoliciesTable/HostPoliciesTableConfig";
import PolicyFailingCount from "./HostPoliciesTable/PolicyFailingCount";

const baseClass = "host-policies-card";

interface IPoliciesProps {
  policies: IHostPolicy[];
  isLoading: boolean;
  deviceUser?: boolean;
  togglePolicyDetailsModal: (policy: IHostPolicy) => void;
  hostPlatform: string;
  router: InjectedRouter;
  currentTeamId?: number;
}

interface IHostPoliciesRowProps extends Row {
  original: IHostPolicy;
}

const Policies = ({
  policies,
  isLoading,
  deviceUser,
  togglePolicyDetailsModal,
  hostPlatform,
  router,
  currentTeamId,
}: IPoliciesProps): JSX.Element => {
  const { t } = useTranslation();
  const tableHeaders = generatePolicyTableHeaders(currentTeamId);
  if (deviceUser) {
    // Remove view all hosts link
    tableHeaders.pop();
  }
  const failingResponses: IHostPolicy[] =
    policies.filter((policy: IHostPolicy) => policy.response === "fail") || [];

  const onClickRow = useCallback(
    (row: IHostPoliciesRowProps) => {
      togglePolicyDetailsModal(row.original);
    },
    [router]
  );

  const renderHostPolicies = () => {
    if (hostPlatform === "ios" || hostPlatform === "ipados") {
      return (
        <EmptyTable
          header={<>{t("hosts:policies.notSupported")}</>}
          info={
            <>
              {hostPlatform === "ios"
                ? t("hosts:policies.interestedIos")
                : t("hosts:policies.interestedIpados")}{" "}
              <CustomLink
                url={SUPPORT_LINK}
                text={t("hosts:policies.letUsKnow")}
                newTab
              />
            </>
          }
        />
      );
    }

    if (isAndroid(hostPlatform)) {
      return (
        <EmptyTable
          header={<>{t("hosts:policies.notSupported")}</>}
          info={
            <>
              {t("hosts:policies.interestedAndroid")}{" "}
              <CustomLink
                url={SUPPORT_LINK}
                text={t("hosts:policies.letUsKnow")}
                newTab
              />
            </>
          }
        />
      );
    }

    if (policies.length === 0) {
      return (
        <EmptyTable
          header={
            <>
              {deviceUser
                ? t("hosts:policies.noPoliciesDevice")
                : t("hosts:policies.noPoliciesHost")}
            </>
          }
          info={
            <>
              {deviceUser
                ? t("hosts:policies.expectingPoliciesDevice")
                : t("hosts:policies.expectingPoliciesHost")}
            </>
          }
        />
      );
    }

    return (
      <>
        {failingResponses?.length > 0 && (
          <PolicyFailingCount policyList={policies} deviceUser={deviceUser} />
        )}
        <TableContainer
          columnConfigs={tableHeaders}
          data={generatePolicyDataSet(policies)}
          isLoading={isLoading}
          defaultSortHeader="status"
          resultsTitle="policies"
          emptyComponent={() => <></>}
          showMarkAllPages={false}
          isAllPagesSelected={false}
          disableCount
          disableMultiRowSelect // Removes hover/click state
          isClientSidePagination
          onClickRow={onClickRow}
          keyboardSelectableRows
        />
      </>
    );
  };

  return (
    <div className={baseClass}>
      <CardHeader header={t("hosts:policies.title")} />
      {renderHostPolicies()}
    </div>
  );
};

export default Policies;
