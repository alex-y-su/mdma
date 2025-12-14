import React, { useContext, useEffect, useState } from "react";

import { useQuery } from "react-query";
import { useDebouncedCallback } from "use-debounce";
import { IAceEditor } from "react-ace/lib/types";
import { Row } from "react-table";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";

import targetsAPI, { ITargetsSearchResponse } from "services/entities/targets";
import idpAPI from "services/entities/idp";
import labelsAPI from "services/entities/labels";

import { DEFAULT_USE_QUERY_OPTIONS } from "utilities/constants";
// TODO - move this table config near here once expanded this logic to encompass editing and
// therefore not longer needed anywhere else
import { generateTableHeaders } from "pages/labels/components/ManualLabelForm/LabelHostTargetTableConfig";

import { validateQuery } from "components/forms/validators/validate_query";

import { QueryContext } from "context/query";
import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";

import useToggleSidePanel from "hooks/useToggleSidePanel";

import { RouteComponentProps } from "react-router";
import {
  LabelHostVitalsCriterion,
  LabelMembershipType,
} from "interfaces/label";
import { IHost } from "interfaces/host";
import { IInputFieldParseTarget } from "interfaces/form_field";

import SidePanelPage from "components/SidePanelPage";
import MainContent from "components/MainContent";
import SidePanelContent from "components/SidePanelContent";
import QuerySidePanel from "components/side_panels/QuerySidePanel";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
// @ts-ignore
import Dropdown from "components/forms/fields/Dropdown";
import Button from "components/buttons/Button";
import SQLEditor from "components/SQLEditor";
import Icon from "components/Icon";
import TargetsInput from "components/TargetsInput";
import Radio from "components/forms/fields/Radio";
import PlatformField from "../components/PlatformField";

const baseClass = "new-label-page";

const DEBOUNCE_DELAY = 500;

interface ITargetsQueryKey {
  scope: string;
  query?: string | null;
  excludedHostIds?: number[];
}

export interface INewLabelFormData {
  name: string;
  description: string; // optional
  type: LabelMembershipType;
  // dynamic
  labelQuery: string;
  platform: string;

  // host vitals
  vital: LabelHostVitalsCriterion; // TODO - make use of recursive `LabelHostVitalsCriteria` type in future iterations to support logical combinations of different criteria
  vitalValue: string;

  // manual
  targetedHosts: IHost[];
}

interface INewLabelFormErrors {
  name?: string | null;
  labelQuery?: string | null;
  criteria?: string | null;
}

const validate = (newData: INewLabelFormData, t: any) => {
  const errors: INewLabelFormErrors = {};
  const { name, type, labelQuery, vitalValue } = newData;
  if (!name) {
    errors.name = t("labels:form.nameRequired");
  }
  if (type === "dynamic") {
    if (!labelQuery) {
      errors.labelQuery = t("labels:newLabel.queryRequired");
    }
  } else if (type === "host_vitals") {
    if (!vitalValue) {
      errors.criteria = t("labels:newLabel.criteriaRequired");
    }
  }
  return errors;
};

const DEFAULT_DYNAMIC_QUERY = "SELECT 1 FROM os_version WHERE major >= 13;";

const NewLabelPage = ({
  router,
  location,
}: RouteComponentProps<never, never>) => {
  const { t } = useTranslation();

  // page-level state
  const { selectedOsqueryTable, setSelectedOsqueryTable } = useContext(
    QueryContext
  );
  const { isPremiumTier } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const { isSidePanelOpen, setSidePanelOpen } = useToggleSidePanel(true);
  const [showOpenSidebarButton, setShowOpenSidebarButton] = useState(false);

  // page-level handlers
  const onCloseSidebar = () => {
    setSidePanelOpen(false);
    setShowOpenSidebarButton(true);
  };

  const onOpenSidebar = () => {
    setSidePanelOpen(true);
    setShowOpenSidebarButton(false);
  };

  const onOsqueryTableSelect = (tableName: string) => {
    setSelectedOsqueryTable(tableName);
  };

  // form state
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<INewLabelFormData>({
    name: "",
    description: "",
    type: "dynamic", // default type
    // dynamic-specific
    labelQuery: DEFAULT_DYNAMIC_QUERY,
    platform: "",
    // host_vitals-specific
    vital: "end_user_idp_group",
    vitalValue: "",
    // manual-specific
    targetedHosts: [],
  });
  const {
    name,
    description,
    type,
    labelQuery,
    platform,
    vital,
    vitalValue,
    targetedHosts,
  } = formData;

  const [formErrors, setFormErrors] = useState<INewLabelFormErrors>({});

  const [targetsSearchQuery, setTargetsSearchQuery] = useState("");
  const [
    debouncedTargetsSearchQuery,
    setDebouncedTargetsSearchQuery,
  ] = useState("");
  const [isDebouncingTargetsSearch, setIsDebouncingTargetsSearch] = useState(
    false
  );

  // "manual" label target search logic
  const debounceSearch = useDebouncedCallback(
    (search: string) => {
      setDebouncedTargetsSearchQuery(search);
      setIsDebouncingTargetsSearch(false);
    },
    DEBOUNCE_DELAY,
    { trailing: true }
  );

  useEffect(() => {
    setIsDebouncingTargetsSearch(true);
    debounceSearch(targetsSearchQuery);
  }, [debounceSearch, targetsSearchQuery]);

  const {
    data: targetsSearchResults,
    isLoading: isLoadingTargetsSearchResults,
    isError: isErrorTargetsSearchResults,
  } = useQuery<ITargetsSearchResponse, Error, IHost[], ITargetsQueryKey[]>(
    [
      {
        scope: "labels-targets-search",
        query: debouncedTargetsSearchQuery,
        excludedHostIds: targetedHosts.map((host) => host.id),
      },
    ],
    ({ queryKey }) => {
      const { query, excludedHostIds } = queryKey[0];
      return targetsAPI.search({
        query: query ?? "",
        excluded_host_ids: excludedHostIds ?? null,
      });
    },
    {
      select: (data) => data.hosts,
      enabled: type === "manual" && !!targetsSearchQuery,
    }
  );

  const { data: scimIdPDetails } = useQuery(
    ["scim_details"],
    () => idpAPI.getSCIMDetails(),
    {
      ...DEFAULT_USE_QUERY_OPTIONS,
      enabled: isPremiumTier,
    }
  );
  const idpConfigured = !!scimIdPDetails?.last_request?.requested_at;

  const availableCriteria: {
    label: string;
    value: LabelHostVitalsCriterion;
  }[] = [
    { label: t("labels:newLabel.idpGroup"), value: "end_user_idp_group" },
    {
      label: t("labels:newLabel.idpDepartment"),
      value: "end_user_idp_department",
    },
  ];

  let hostVitalsTooltipContent: React.ReactNode;
  if (!isPremiumTier) {
    hostVitalsTooltipContent = t("labels:tooltips.hostVitals");
  } else if (!idpConfigured) {
    hostVitalsTooltipContent = t("labels:tooltips.idpConfig");
  }

  useEffect(() => {
    if (location.pathname.includes("dynamic")) {
      router.replace(PATHS.NEW_LABEL);
    }
    if (location.pathname.includes("manual")) {
      setFormData((prevData) => ({
        ...prevData,
        type: "manual",
      }));

      router.replace(PATHS.NEW_LABEL);
    }
  }, [location.pathname, router]);

  // form handlers

  const onInputChange = ({
    name: fieldName,
    value,
  }: IInputFieldParseTarget) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);
    const newErrs = validate(newFormData, t);
    // only set errors that are updates of existing errors
    // new errors are only set onBlur or submit
    const errsToSet: Record<string, string> = {};
    Object.keys(formErrors).forEach((k) => {
      // @ts-ignore
      if (newErrs[k]) {
        // @ts-ignore
        errsToSet[k] = newErrs[k];
      }
    });
    setFormErrors(errsToSet);
  };

  const onTypeChange = (value: string): void => {
    const newFormData = {
      ...formData,
      type: value as LabelMembershipType, // reconcile type differences between form data and radio component handler
    };
    setFormData(newFormData);

    const newErrs = validate(newFormData, t);
    const errsToSet: Record<string, string> = {};
    Object.keys(formErrors).forEach((k) => {
      // @ts-ignore
      if (newErrs[k]) {
        // @ts-ignore
        errsToSet[k] = newErrs[k];
      }
    });
    setFormErrors(errsToSet);
  };

  const onInputBlur = () => {
    setFormErrors(validate(formData, t));
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const errs = validate(formData, t);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setIsUpdating(true);
    try {
      await labelsAPI.create(formData);
      router.push(PATHS.MANAGE_LABELS);
      renderFlash("success", t("labels:newLabel.success"));
    } catch {
      renderFlash("error", t("labels:newLabel.error"));
    }
    setIsUpdating(false);
  };

  const debounceValidateSQL = useDebouncedCallback((queryString: string) => {
    const { error } = validateQuery(queryString);
    return error || null;
  }, 500);

  const onQueryChange = (newQuery: string) => {
    setFormData((prevData) => ({
      ...prevData,
      labelQuery: newQuery,
    }));
    debounceValidateSQL(newQuery);
  };

  // form rendering helpers
  const onLoadSQLEditor = (editor: IAceEditor) => {
    editor.setOptions({
      enableLinking: true,
      enableMultiselect: false, // Disables command + click creating multiple cursors
    });

    // @ts-expect-error
    // the string "linkClick" is not officially in the lib but we need it
    editor.on("linkClick", (data) => {
      const { type: type_, value } = data.token;

      if (type_ === "osquery-token" && onOsqueryTableSelect) {
        return onOsqueryTableSelect(value);
      }

      return false;
    });
  };

  const onChangeSearchQuery = (value: string) => {
    setTargetsSearchQuery(value);
  };
  const onHostSelect = (row: Row<IHost>) => {
    setFormData((prevData) => ({
      ...prevData,
      targetedHosts: targetedHosts.concat(row.original),
    }));
    setTargetsSearchQuery("");
  };

  const onHostRemove = (row: Row<IHost>) => {
    setFormData((prevData) => ({
      ...prevData,
      targetedHosts: targetedHosts.filter((h) => h.id !== row.original.id),
    }));
  };
  const resultsTableConfig = generateTableHeaders(undefined, t);
  const selectedHostsTableConfig = generateTableHeaders(onHostRemove, t);

  const renderVariableFields = () => {
    switch (type) {
      case "dynamic":
        return (
          <>
            <SQLEditor
              error={formErrors.labelQuery}
              name="query"
              onChange={onQueryChange}
              onBlur={onInputBlur}
              value={labelQuery}
              label={t("labels:newLabel.query")}
              labelActionComponent={
                showOpenSidebarButton ? (
                  <Button variant="inverse" onClick={onOpenSidebar}>
                    {t("labels:newLabel.schema")}
                    <Icon name="info" size="small" />
                  </Button>
                ) : null
              }
              // readOnly={isEditing} TODO when extending to handle edits
              onLoad={onLoadSQLEditor}
              wrapperClassName={`${baseClass}__text-editor-wrapper form-field`}
              // helpText={isEditing ? IMMUTABLE_QUERY_HELP_TEXT : ""} TODO when extending to handle edits
              wrapEnabled
            />
            <PlatformField
              platform={platform}
              // isEditing={isEditing} TODO when extending to handle edits

              // onChange={onInputChange} TODO - once this form covers edits, can use the commmon
              // `onInputChange` along with updating PlatformField's Dropdown to `parseTarget`
              onChange={(newPlatform) => {
                setFormData((prevData) => ({
                  ...prevData,
                  platform: newPlatform,
                }));
              }}
            />
          </>
        );

      case "host_vitals":
        return (
          <div className={`${baseClass}__host_vitals-fields`}>
            <label className="form-field__label" htmlFor="criterion-and-value">
              {t("labels:newLabel.labelCriteria")}
            </label>
            <span id="criterion-and-value">
              <Dropdown
                name="vital"
                onChange={onInputChange}
                parseTarget
                value={vital}
                error={formErrors.criteria}
                options={availableCriteria}
                classname={`${baseClass}__criteria-dropdown`}
                wrapperClassName={`${baseClass}__form-field ${baseClass}__form-field--criteria`}
              />
              <p>{t("labels:newLabel.isEqualTo")}</p>
              <InputField
                error={formErrors.criteria}
                name="vitalValue"
                onChange={onInputChange}
                onBlur={onInputBlur}
                value={vitalValue}
                inputClassName={`${baseClass}__vital-value`}
                placeholder={
                  vital === "end_user_idp_group"
                    ? t("labels:newLabel.idpPlaceholder")
                    : t("labels:newLabel.departmentPlaceholder")
                }
                parseTarget
              />
            </span>
            <span className="form-field__help-text">
              {t("labels:newLabel.criteriaHelp")}
            </span>
          </div>
        );

      case "manual":
        return (
          <TargetsInput
            label={t("labels:manualLabel.selectHosts")}
            placeholder={t("labels:manualLabel.searchPlaceholder")}
            searchText={targetsSearchQuery}
            searchResultsTableConfig={resultsTableConfig}
            selectedHostsTableConifg={selectedHostsTableConfig}
            isTargetsLoading={
              isLoadingTargetsSearchResults || isDebouncingTargetsSearch
            }
            hasFetchError={isErrorTargetsSearchResults}
            searchResults={targetsSearchResults ?? []}
            targetedHosts={targetedHosts}
            setSearchText={onChangeSearchQuery}
            handleRowSelect={onHostSelect}
          />
        );
      default:
        return null;
    }
  };

  const renderLabelForm = () => (
    <form className={`${baseClass}__label-form`} onSubmit={onSubmit}>
      <InputField
        error={formErrors.name}
        name="name"
        onChange={onInputChange}
        onBlur={onInputBlur}
        value={name}
        inputClassName={`${baseClass}__label-name`}
        label={t("labels:form.name")}
        placeholder={t("labels:form.namePlaceholder")}
        parseTarget
      />
      <InputField
        name="description"
        onChange={onInputChange}
        onBlur={onInputBlur}
        value={description}
        inputClassName={`${baseClass}__label-description`}
        label={t("labels:form.description")}
        type="textarea"
        placeholder={t("labels:form.descriptionPlaceholder")}
        parseTarget
      />
      <div className="form-field type-field">
        <div className="form-field__label">{t("labels:form.type")}</div>
        <Radio
          className={`${baseClass}__radio-input`}
          label={t("labels:types.dynamic")}
          id="dynamic"
          checked={type === "dynamic"}
          value="dynamic"
          name="label-type"
          onChange={onTypeChange}
        />
        <Radio
          className={`${baseClass}__radio-input`}
          label={t("labels:types.hostVitals")}
          id="host_vitals"
          checked={type === "host_vitals"}
          value="host_vitals"
          name="label-type"
          onChange={onTypeChange}
          tooltip={hostVitalsTooltipContent}
          disabled={!!hostVitalsTooltipContent}
        />
        <Radio
          className={`${baseClass}__radio-input`}
          label={t("labels:types.manual")}
          id="manual"
          checked={type === "manual"}
          value="manual"
          name="label-type"
          onChange={onTypeChange}
        />
      </div>
      {renderVariableFields()}
      <div className="button-wrap">
        <Button
          onClick={() => {
            router.goBack();
          }}
          variant="inverse"
          disabled={isUpdating}
        >
          {t("common:buttons.cancel")}
        </Button>
        <Button
          type="submit"
          isLoading={isUpdating}
          disabled={isUpdating || !!Object.entries(formErrors).length}
        >
          {t("common:buttons.save")}
        </Button>
      </div>
    </form>
  );

  return (
    <SidePanelPage>
      <>
        <MainContent className={baseClass}>
          <div className={`${baseClass}__header`}>
            <h1 className="page-header">{t("labels:newLabel.title")}</h1>
            <p className={`${baseClass}__page-description`}>
              {t("labels:newLabel.description")}
            </p>
          </div>
          {renderLabelForm()}
        </MainContent>
        {type === "dynamic" && isSidePanelOpen && (
          <SidePanelContent>
            <QuerySidePanel
              key="query-side-panel"
              onOsqueryTableSelect={onOsqueryTableSelect}
              selectedOsqueryTable={selectedOsqueryTable}
              onClose={onCloseSidebar}
            />
          </SidePanelContent>
        )}
      </>
    </SidePanelPage>
  );
};

export default NewLabelPage;
