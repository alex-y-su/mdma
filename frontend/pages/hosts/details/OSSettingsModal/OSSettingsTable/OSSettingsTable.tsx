import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import TableContainer from "components/TableContainer";

import generateTableHeaders, {
  IHostMdmProfileWithAddedStatus,
} from "./OSSettingsTableConfig";

const baseClass = "os-settings-table";

interface IOSSettingsTableProps {
  canResendProfiles: boolean;
  tableData: IHostMdmProfileWithAddedStatus[];
  resendRequest: (profileUUID: string) => Promise<void>;
  onProfileResent: () => void;
}

const OSSettingsTable = ({
  canResendProfiles,
  tableData,
  resendRequest,
  onProfileResent,
}: IOSSettingsTableProps) => {
  const { t } = useTranslation("hosts");
  // useMemo prevents tooltip flashing during host data refetch
  const tableConfig = useMemo(
    () =>
      generateTableHeaders(
        canResendProfiles,
        resendRequest,
        onProfileResent,
        t
      ),
    [canResendProfiles, resendRequest, onProfileResent, t]
  );

  return (
    <div className={baseClass}>
      <TableContainer
        resultsTitle={t("osSettingsModal.settings")}
        defaultSortHeader="name"
        columnConfigs={tableConfig}
        data={tableData}
        emptyComponent="symbol"
        isLoading={false}
        showMarkAllPages={false}
        isAllPagesSelected={false}
        disablePagination
      />
    </div>
  );
};

export default OSSettingsTable;
