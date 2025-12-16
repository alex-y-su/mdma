import React, { useState, useCallback, useContext } from "react";
import { useQuery } from "react-query";
import { filter, includes } from "lodash";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";

import permissions from "utilities/permissions";

import { AppContext } from "context/app";
import { QueryContext } from "context/query";

import queryAPI from "services/entities/queries";

// @ts-ignore
import InputFieldWithIcon from "components/forms/fields/InputFieldWithIcon";
import Button from "components/buttons/Button";
import Modal from "components/Modal";
import DataError from "components/DataError";

import {
  IListQueriesResponse,
  IQueryKeyQueriesLoadAll,
  ISchedulableQuery,
} from "interfaces/schedulable_query";
import { API_ALL_TEAMS_ID } from "interfaces/team";
import { DEFAULT_TARGETS_BY_TYPE } from "interfaces/target";
import { getPathWithQueryParams } from "utilities/url";

export interface ISelectQueryModalProps {
  onCancel: () => void;
  isOnlyObserver?: boolean;
  hostId: number;
  hostTeamId: number | null;
  router: InjectedRouter; // v3
  currentTeamId: number | undefined;
}

const baseClass = "select-query-modal";

const SelectQueryModal = ({
  onCancel,
  isOnlyObserver,
  hostId,
  hostTeamId,
  router,
  currentTeamId,
}: ISelectQueryModalProps): JSX.Element => {
  const { t } = useTranslation("hosts");
  const { setSelectedQueryTargetsByType } = useContext(QueryContext);

  const { data: queries, error: queriesErr } = useQuery<
    IListQueriesResponse,
    Error,
    ISchedulableQuery[],
    IQueryKeyQueriesLoadAll[]
  >(
    [
      {
        scope: "queries",
        teamId: hostTeamId || API_ALL_TEAMS_ID,
        mergeInherited: hostTeamId !== API_ALL_TEAMS_ID,
      },
    ],
    ({ queryKey }) => queryAPI.loadAll(queryKey[0]),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      select: (data: IListQueriesResponse) => data.queries,
    }
  );

  const onQueryHostCustom = () => {
    setSelectedQueryTargetsByType(DEFAULT_TARGETS_BY_TYPE);
    router.push(
      getPathWithQueryParams(PATHS.NEW_QUERY, {
        host_id: hostId,
        team_id: currentTeamId,
      })
    );
  };

  const onQueryHostSaved = (selectedQuery: ISchedulableQuery) => {
    setSelectedQueryTargetsByType(DEFAULT_TARGETS_BY_TYPE);
    router.push(
      getPathWithQueryParams(PATHS.EDIT_QUERY(selectedQuery.id), {
        host_id: hostId,
        team_id: currentTeamId,
      })
    );
  };

  let queriesAvailableToRun = queries;

  const { currentUser, isObserverPlus } = useContext(AppContext);

  /*  Context team id might be different that host's team id
  Observer plus must be checked against host's team id  */
  const isHostsTeamObserverPlus = currentUser
    ? permissions.isObserverPlus(currentUser, hostTeamId)
    : false;

  const [queriesFilter, setQueriesFilter] = useState("");

  if (isOnlyObserver && !isObserverPlus && !isHostsTeamObserverPlus) {
    queriesAvailableToRun =
      queries?.filter((query) => query.observer_can_run === true) || [];
  }

  const getQueries = () => {
    if (!queriesFilter) {
      return queriesAvailableToRun;
    }

    const lowerQueryFilter = queriesFilter.toLowerCase();

    return filter(queriesAvailableToRun, (query) => {
      if (!query.name) {
        return false;
      }

      const lowerQueryName = query.name.toLowerCase();

      return includes(lowerQueryName, lowerQueryFilter);
    });
  };

  const onFilterQueries = useCallback(
    (filterString: string): void => {
      setQueriesFilter(filterString);
    },
    [setQueriesFilter]
  );

  const queriesFiltered = getQueries();

  const queriesCount = queriesFiltered?.length || 0;

  const renderDescription = (): JSX.Element => {
    return (
      <div className={`${baseClass}__description`}>
        {t("modals.selectQuery.description")}
        {(!isOnlyObserver || isObserverPlus || isHostsTeamObserverPlus) && (
          <>
            {" "}
            {t("modals.selectQuery.or")}{" "}
            <Button variant="text-link" onClick={onQueryHostCustom}>
              {t("modals.selectQuery.createYourOwnQuery")}
            </Button>
          </>
        )}
        .
      </div>
    );
  };

  const renderQueries = (): JSX.Element => {
    if (queriesErr) {
      return <DataError />;
    }

    if (!queriesFilter && queriesCount === 0) {
      return (
        <div className={`${baseClass}__no-queries`}>
          <span className="info__header">
            {t("modals.selectQuery.noQueriesHeader")}
          </span>
          <span className="info__data">
            {t("modals.selectQuery.noQueriesInfo")}
          </span>
        </div>
      );
    }

    if (queriesCount > 0) {
      const queryList =
        queriesFiltered?.map((query) => {
          return (
            <Button
              key={query.id}
              variant="unstyled-modal-query"
              className={`${baseClass}__modal-query-button`}
              onClick={() => onQueryHostSaved(query)}
            >
              <>
                <span className="info__header">{query.name}</span>
                {query.description && (
                  <span className="info__data">{query.description}</span>
                )}
              </>
            </Button>
          );
        }) || [];

      return (
        <>
          <InputFieldWithIcon
            name="query-filter"
            onChange={onFilterQueries}
            placeholder={t("modals.selectQuery.filterQueriesPlaceholder")}
            value={queriesFilter}
            autofocus
            iconSvg="search"
            iconPosition="start"
          />
          <div className={`${baseClass}__query-selection`}>{queryList}</div>
        </>
      );
    }

    if (queriesFilter && queriesCount === 0) {
      return (
        <>
          <div className={`${baseClass}__filter-queries`}>
            <InputFieldWithIcon
              name="query-filter"
              onChange={onFilterQueries}
              placeholder={t("modals.selectQuery.filterQueriesPlaceholder")}
              value={queriesFilter}
              autofocus
              iconSvg="search"
              iconPosition="start"
            />
          </div>
          <div className={`${baseClass}__no-queries`}>
            <span className="info__header">
              {t("modals.selectQuery.noMatchHeader")}
            </span>
            <span className="info__data">
              {t("modals.selectQuery.noMatchInfo")}
            </span>
          </div>
        </>
      );
    }
    return <></>;
  };

  return (
    <Modal
      title={t("modals.selectQuery.title")}
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
      width="large"
    >
      <>
        {renderDescription()}
        {renderQueries()}
      </>
    </Modal>
  );
};

export default SelectQueryModal;
