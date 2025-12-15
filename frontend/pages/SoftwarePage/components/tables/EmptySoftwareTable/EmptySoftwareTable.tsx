import React from "react";
import { useTranslation } from "react-i18next";
import CustomLink from "components/CustomLink";
import EmptyTable from "components/EmptyTable";
import { IEmptyTableProps } from "interfaces/empty_table";
import {
  getVulnFilterRenderDetails,
  ISoftwareDropdownFilterVal,
  ISoftwareVulnFiltersParams,
} from "pages/SoftwarePage/SoftwareTitles/SoftwareTable/helpers";
import { HostPlatform, isAndroid } from "interfaces/platform";

export interface IEmptySoftwareTableProps {
  softwareFilter?: ISoftwareDropdownFilterVal;
  vulnFilters?: ISoftwareVulnFiltersParams;
  tableName?: string;
  isSoftwareDisabled?: boolean;
  noSearchQuery?: boolean;
  installableSoftwareExists?: boolean;
  platform?: HostPlatform;
}

const EmptySoftwareTable = ({
  softwareFilter = "allSoftware",
  vulnFilters,
  tableName = "software",
  isSoftwareDisabled,
  noSearchQuery,
  installableSoftwareExists,
  platform,
}: IEmptySoftwareTableProps): JSX.Element => {
  const { t } = useTranslation("software");

  const generateTypeText = (
    tableName: string,
    softwareFilter?: ISoftwareDropdownFilterVal,
    vulnFilters?: ISoftwareVulnFiltersParams
  ) => {
    if (softwareFilter === "installableSoftware") {
      return t("emptyStates.installableSoftware");
    }
    if (vulnFilters?.vulnerable) {
      return t("emptyStates.vulnerableSoftware");
    }
    return tableName;
  };

  const softwareTypeText = generateTypeText(
    tableName,
    softwareFilter,
    vulnFilters
  );

  const { filterCount: vulnFiltersCount } = getVulnFilterRenderDetails(
    vulnFilters
  );

  const isFiltered =
    vulnFiltersCount > 0 || !noSearchQuery || softwareFilter !== "allSoftware";

  const getEmptySoftwareInfo = (): IEmptyTableProps => {
    if (isSoftwareDisabled) {
      return {
        header: t("emptyStates.softwareInventoryDisabled.header"),
        info: (
          <>
            {t("emptyStates.softwareInventoryDisabled.info")}{" "}
            <CustomLink
              url="https://fleetdm.com/docs/using-fleet/vulnerability-processing#configuration"
              text={t("emptyStates.softwareInventoryDisabled.linkText")}
              newTab
            />
            .
          </>
        ),
      };
    }

    let info = t("emptyStates.noSoftwareDetected.infoExpecting", { softwareType: softwareTypeText });
    if (isAndroid(platform || "")) {
      info = `${info} ${t("emptyStates.noSoftwareDetected.infoAndroid")}`;
    }

    if (!isFiltered) {
      if (softwareFilter === "allSoftware") {
        if (installableSoftwareExists) {
          return {
            header: t("emptyStates.noSoftwareDetected.header", { tableName }),
            info: t("emptyStates.noSoftwareDetected.infoInstallable"),
          };
        }
        return {
          header: t("emptyStates.noSoftwareDetected.header", { tableName }),
          info,
        };
      }
    }

    return {
      header: t("emptyStates.noItemsMatch.header"),
      info,
    };
  };

  const emptySoftware = getEmptySoftwareInfo();

  return (
    <EmptyTable
      graphicName="empty-search-question"
      header={emptySoftware.header}
      info={emptySoftware.info}
    />
  );
};

export default EmptySoftwareTable;
