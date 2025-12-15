import React from "react";
import { useTranslation } from "react-i18next";

import { add, differenceInSeconds, formatDistance } from "date-fns";

import TooltipWrapper from "components/TooltipWrapper/TooltipWrapper";
import EmptyTable from "components/EmptyTable/EmptyTable";

interface INoResultsProps {
  queryInterval?: number;
  queryUpdatedAt?: string;
  disabledCaching: boolean;
  disabledCachingGlobally: boolean;
  discardDataEnabled: boolean;
  loggingSnapshot: boolean;
}

const baseClass = "no-results";

const NoResults = ({
  queryInterval,
  queryUpdatedAt,
  disabledCaching,
  disabledCachingGlobally,
  discardDataEnabled,
  loggingSnapshot,
}: INoResultsProps): JSX.Element => {
  const { t } = useTranslation("queries");
  // Returns how many seconds it takes to expect a cached update
  const secondsCheckbackTime = () => {
    const secondsSinceUpdate = queryUpdatedAt
      ? differenceInSeconds(new Date(), new Date(queryUpdatedAt))
      : 0;
    const secondsUpdateWaittime = (queryInterval || 0) + 60;
    return secondsUpdateWaittime - secondsSinceUpdate;
  };

  // Update status of collecting cached results
  const collectingResults =
    (queryInterval ?? 0) > 0 && secondsCheckbackTime() > 0;

  // Converts seconds takes to update to human readable format
  const readableCheckbackTime = formatDistance(
    add(new Date(), { seconds: secondsCheckbackTime() }),
    new Date()
  );

  // Collecting results state only shows if caching is enabled
  if (collectingResults && !disabledCaching) {
    const collectingResultsInfo = () => (
      <>
        {t("noResults.collectingMessage", { time: readableCheckbackTime })}
      </>
    );

    return (
      <EmptyTable
        graphicName="collecting-results"
        header={t("noResults.collectingHeader")}
        info={collectingResultsInfo()}
      />
    );
  }

  const getNoResultsInfo = () => {
    // In order of empty page priority
    if (disabledCaching) {
      const tipContent = () => {
        if (disabledCachingGlobally) {
          return (
            <>
              <div>
                {t("noResults.preventsSaving")}
              </div>
              <div>
                &nbsp; • {t("noResults.globallyDisabled")}
              </div>
            </>
          );
        }
        if (discardDataEnabled) {
          return (
            <>
              <div>
                {t("noResults.preventsSaving")}
              </div>
              <div>
                &nbsp; • {t("noResults.discardDataEnabled")}
              </div>
            </>
          );
        }
        if (!loggingSnapshot) {
          return (
            <>
              <div>
                {t("noResults.preventsSaving")}
              </div>
              <div>
                &nbsp; • {t("noResults.loggingNotSnapshot")}
              </div>
            </>
          );
        }
        return "Unknown";
      };
      return [
        t("noResults.nothingToReport"),
        <>
          {t("noResults.resultsNotReported")}{" "}
          <TooltipWrapper tipContent={tipContent()}>
            {t("noResults.notReportedInFleet")}
          </TooltipWrapper>
          .
        </>,
      ];
    }
    if (!queryInterval) {
      return [
        t("noResults.nothingToReport"),
        <>
          {t("noResults.noSchedule")}
        </>,
      ];
    }
    // No errors will be reported in V1
    // if (errorsOnly) {
    //   return (
    //     <>
    //       This query had trouble collecting data on some hosts. Check out the{" "}
    //       <strong>Errors</strong> tab to see why.
    //     </>
    //   );
    // }
    return [
      t("noResults.nothingToReportYet"),
      <>
        {t("noResults.noDataYet")}
      </>,
    ];
  };

  const [emptyHeader, emptyDetails] = getNoResultsInfo();
  return (
    <EmptyTable
      className={baseClass}
      graphicName="empty-software"
      header={emptyHeader}
      info={emptyDetails}
    />
  );
};

export default NoResults;
