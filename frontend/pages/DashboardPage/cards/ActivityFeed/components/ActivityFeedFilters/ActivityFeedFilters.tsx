import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ACTIVITY_DISPLAY_NAME_MAP, ActivityType } from "interfaces/activity";

import SearchField from "components/forms/fields/SearchField";
import ActionsDropdown from "components/ActionsDropdown";
import DropdownWrapper from "components/forms/fields/DropdownWrapper";

import ActivityTypeDropdown from "../ActivityTypeDropdown";

const baseClass = "activity-feed-filters";

interface ActivityFeedFiltersProps {
  searchQuery: string;
  typeFilter: string[];
  dateFilter: string;
  createdAtDirection: string;
  setSearchQuery: (value: string) => void;
  setTypeFilter: (updater: (prev: string[]) => string[]) => void;
  setDateFilter: (value: string) => void;
  setCreatedAtDirection: (value: string) => void;
  setPageIndex: (value: number) => void;
}

const ActivityFeedFilters = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  dateFilter,
  setDateFilter,
  createdAtDirection,
  setCreatedAtDirection,
  setPageIndex,
}: ActivityFeedFiltersProps) => {
  const { t } = useTranslation();

  const dateFilterOptions = useMemo(
    () => [
      { label: t("common:time.allTime"), value: "all" },
      { label: t("common:time.today"), value: "today" },
      { label: t("common:time.yesterday"), value: "yesterday" },
      { label: t("common:time.last7Days"), value: "7d" },
      { label: t("common:time.last30Days"), value: "30d" },
      { label: t("dashboard:activity.last3Months"), value: "3m" },
      { label: t("dashboard:activity.last12Months"), value: "12m" },
    ],
    [t]
  );

  const sortOptions = useMemo(
    () => [
      { label: t("common:filters.newest"), value: "desc" },
      { label: t("common:filters.oldest"), value: "asc" },
    ],
    [t]
  );

  const onChangeActivityType = (value: string) => {
    setTypeFilter((prev: string[]) => [value]);
    setPageIndex(0);
  };

  return (
    <div className={baseClass}>
      <SearchField
        placeholder={t("dashboard:activity.searchPlaceholder")}
        defaultValue={searchQuery}
        onChange={(value) => {
          setSearchQuery(value);
          setPageIndex(0);
        }}
        icon="search"
      />
      <div className={`${baseClass}__dropdown-filters`}>
        <ActivityTypeDropdown
          className={`${baseClass}__type-filter-dropdown`}
          value={typeFilter[0] || "all"}
          onSelect={onChangeActivityType}
        />
        <DropdownWrapper
          className={`${baseClass}__date-filter-dropdown`}
          iconName="calendar"
          name="date-filter"
          options={dateFilterOptions}
          value={dateFilter}
          onChange={(value) => {
            if (value === null) return;
            setDateFilter(value.value);
            setPageIndex(0); // Reset to first page on sort change
          }}
        />
        <DropdownWrapper
          className={`${baseClass}__sort-created-at-dropdown`}
          name="created-at-filter"
          iconName="filter"
          options={sortOptions}
          value={createdAtDirection}
          onChange={(value) => {
            if (value === null) return;
            if (value.value === createdAtDirection) {
              return; // No change in sort direction
            }
            setCreatedAtDirection(value.value);
            setPageIndex(0); // Reset to first page on sort change
          }}
        />
      </div>
    </div>
  );
};

export default ActivityFeedFilters;
