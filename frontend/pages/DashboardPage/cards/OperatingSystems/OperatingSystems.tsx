import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import {
  OS_END_OF_LIFE_LINK_BY_PLATFORM,
  OS_VENDOR_BY_PLATFORM,
} from "interfaces/operating_system";
import {
  getOSVersions,
  IGetOSVersionsQueryKey,
  IOSVersionsResponse,
  OS_VERSIONS_API_SUPPORTED_PLATFORMS,
} from "services/entities/operating_systems";
import { PlatformValueOptions } from "utilities/constants";

import Spinner from "components/Spinner";
import DataError from "components/DataError";
import LastUpdatedText from "components/LastUpdatedText";
import CustomLink from "components/CustomLink";
import { AxiosError } from "axios";

import OSTable from "./OSTable";

interface IOperatingSystemsCardProps {
  currentTeamId: number | undefined;
  selectedPlatform: PlatformValueOptions;
  showTitle: boolean;
  /** controls the displaying of description text under the title. Defaults to `true` */
  showDescription?: boolean;
  setShowTitle: (showTitle: boolean) => void;
  setTitleDetail?: (content: JSX.Element | string | null) => void;
  setTitleDescription?: (content: JSX.Element | string | null) => void;
}

const baseClass = "operating-systems";

const OperatingSystems = ({
  currentTeamId,
  selectedPlatform,
  showTitle,
  showDescription = true,
  setShowTitle,
  setTitleDetail,
  setTitleDescription,
}: IOperatingSystemsCardProps): JSX.Element => {
  const { t } = useTranslation("dashboard");

  const { data: osInfo, error, isLoading } = useQuery<
    IOSVersionsResponse,
    AxiosError,
    IOSVersionsResponse,
    IGetOSVersionsQueryKey[]
  >(
    [
      {
        scope: "os_versions",
        platform: selectedPlatform !== "all" ? selectedPlatform : undefined,
        teamId: currentTeamId,
      },
    ],
    ({ queryKey: [{ platform, teamId }] }) => {
      return getOSVersions({
        platform,
        teamId,
      });
    },
    {
      enabled: OS_VERSIONS_API_SUPPORTED_PLATFORMS.includes(selectedPlatform),
      staleTime: 10000,
      keepPreviousData: true,
      retry: 0,
    }
  );

  const renderDescription = () => {
    if (selectedPlatform === "chrome") {
      return (
        <p>
          {t("osVersions.chromebookUpdatesInfo")}{" "}
          <CustomLink
            url="https://fleetdm.com/learn-more-about/chromeos-updates"
            text={t("osVersions.learnMore")}
            newTab
            multiline
          />
        </p>
      );
    }
    if (
      showDescription &&
      OS_VENDOR_BY_PLATFORM[selectedPlatform] &&
      OS_END_OF_LIFE_LINK_BY_PLATFORM[selectedPlatform]
    )
      return (
        <p>
          {OS_VENDOR_BY_PLATFORM[selectedPlatform]} {t("osVersions.osVendorUpdatesInfo")}{" "}
          <CustomLink
            url={OS_END_OF_LIFE_LINK_BY_PLATFORM[selectedPlatform]}
            text={t("osVersions.seeSupportedOs")}
            newTab
            multiline
          />
        </p>
      );
    return null;
  };
  const titleDetail = osInfo?.counts_updated_at ? (
    <LastUpdatedText
      lastUpdatedAt={osInfo?.counts_updated_at}
      whatToRetrieve={t("osVersions.lastUpdatedLabel")}
    />
  ) : null;

  const osVersions = osInfo?.os_versions || [];

  useEffect(() => {
    if (isLoading) {
      setShowTitle(false);
      setTitleDescription?.(null);
      setTitleDetail?.(null);
      return;
    }
    setShowTitle(true);
    if (osVersions.length) {
      setTitleDescription?.(renderDescription());
      setTitleDetail?.(titleDetail);
      return;
    }
    setTitleDescription?.(null);
    setTitleDetail?.(null);
  }, [isLoading, osInfo, setTitleDescription, setTitleDetail]);

  // Renders opaque information as host information is loading
  const opacity = isLoading || !showTitle ? { opacity: 0 } : { opacity: 1 };

  return (
    <div className={baseClass}>
      {isLoading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <div style={opacity}>
        {error?.status && error?.status >= 500 ? (
          <DataError verticalPaddingSize="pad-large" />
        ) : (
          <OSTable
            currentTeamId={currentTeamId}
            osVersions={osVersions}
            selectedPlatform={selectedPlatform}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default OperatingSystems;
