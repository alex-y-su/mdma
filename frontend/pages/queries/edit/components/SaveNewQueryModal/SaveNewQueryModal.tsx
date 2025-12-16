import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import { size } from "lodash";

import { AppContext } from "context/app";

import useDeepEffect from "hooks/useDeepEffect";
import { IPlatformSelector } from "hooks/usePlatformSelector";

import {
  FREQUENCY_DROPDOWN_OPTIONS,
  LOGGING_TYPE_OPTIONS,
  MIN_OSQUERY_VERSION_OPTIONS,
  DEFAULT_USE_QUERY_OPTIONS,
} from "utilities/constants";

import { CommaSeparatedPlatformString } from "interfaces/platform";
import {
  ICreateQueryRequestBody,
  ISchedulableQuery,
  QueryLoggingOption,
} from "interfaces/schedulable_query";

import Checkbox from "components/forms/fields/Checkbox";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
// @ts-ignore
import Dropdown from "components/forms/fields/Dropdown";
import Slider from "components/forms/fields/Slider";
import TooltipWrapper from "components/TooltipWrapper";
import Icon from "components/Icon";
import Button from "components/buttons/Button";
import Modal from "components/Modal";
import RevealButton from "components/buttons/RevealButton";
import LogDestinationIndicator from "components/LogDestinationIndicator";
import TargetLabelSelector from "components/TargetLabelSelector";
import labelsAPI, {
  getCustomLabels,
  ILabelsSummaryResponse,
} from "services/entities/labels";

import DiscardDataOption from "../DiscardDataOption";

const baseClass = "save-query-modal";
export interface ISaveNewQueryModalProps {
  queryValue: string;
  apiTeamIdForQuery?: number; // query will be global if omitted
  isLoading: boolean;
  saveQuery: (formData: ICreateQueryRequestBody) => void;
  toggleSaveNewQueryModal: () => void;
  backendValidators: { [key: string]: string };
  existingQuery?: ISchedulableQuery;
  queryReportsDisabled?: boolean;
  platformSelector: IPlatformSelector;
}

const validateQueryName = (name: string, t: any) => {
  const errors: { [key: string]: string } = {};

  if (!name) {
    errors.name = t("modals.saveNew.nameRequired");
  }

  const valid = !size(errors);
  return { valid, errors };
};

const SaveNewQueryModal = ({
  queryValue,
  apiTeamIdForQuery,
  isLoading,
  saveQuery,
  toggleSaveNewQueryModal,
  backendValidators,
  existingQuery,
  queryReportsDisabled,
  platformSelector,
}: ISaveNewQueryModalProps): JSX.Element => {
  const { t } = useTranslation("queries");
  const { config, isPremiumTier } = useContext(AppContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(
    existingQuery?.interval ?? 3600
  );
  const [
    selectedMinOsqueryVersionOptions,
    setSelectedMinOsqueryVersionOptions,
  ] = useState(existingQuery?.min_osquery_version ?? "");
  const [
    selectedLoggingType,
    setSelectedLoggingType,
  ] = useState<QueryLoggingOption>(existingQuery?.logging ?? "snapshot");
  const [observerCanRun, setObserverCanRun] = useState(false);
  const [automationsEnabled, setAutomationsEnabled] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState("All hosts");
  const [selectedLabels, setSelectedLabels] = useState({});
  const [discardData, setDiscardData] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    backendValidators
  );
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const {
    data: { labels } = { labels: [] },
    isFetching: isFetchingLabels,
  } = useQuery<ILabelsSummaryResponse, Error>(
    ["custom_labels"],
    () => labelsAPI.summary(),
    {
      ...DEFAULT_USE_QUERY_OPTIONS,
      enabled: isPremiumTier,
      staleTime: 10000,
      select: (res) => ({ labels: getCustomLabels(res.labels) }),
    }
  );

  const onSelectLabel = ({
    name: labelName,
    value,
  }: {
    name: string;
    value: boolean;
  }) => {
    setSelectedLabels({
      ...selectedLabels,
      [labelName]: value,
    });
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  useDeepEffect(() => {
    if (name) {
      setErrors({});
    }
  }, [name]);

  useEffect(() => {
    setErrors(backendValidators);
  }, [backendValidators]);

  // Disable saving if "Custom" targeting is selected, but no labels are selected.
  const canSave =
    platformSelector.isAnyPlatformSelected &&
    (selectedTargetType === "All hosts" ||
      Object.entries(selectedLabels).some(([, value]) => {
        return value;
      }));

  const onClickSaveQuery = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const trimmedName = name.trim();

    const { valid, errors: newErrors } = validateQueryName(trimmedName, t);
    setErrors({
      ...errors,
      ...newErrors,
    });
    setName(trimmedName);

    const newPlatformString = platformSelector
      .getSelectedPlatforms()
      .join(",") as CommaSeparatedPlatformString;

    if (valid) {
      saveQuery({
        // from modal fields
        name: trimmedName,
        description,
        interval: selectedFrequency,
        observer_can_run: observerCanRun,
        automations_enabled: automationsEnabled,
        discard_data: discardData,
        platform: newPlatformString,
        min_osquery_version: selectedMinOsqueryVersionOptions,
        logging: selectedLoggingType,
        // from previous New query page
        query: queryValue,
        // from doubly previous ManageQueriesPage
        team_id: apiTeamIdForQuery,
        labels_include_any:
          selectedTargetType === "Custom"
            ? Object.entries(selectedLabels)
                .filter(([, selected]) => selected)
                .map(([labelName]) => labelName)
            : [],
      });
    }
  };

  return (
    <Modal title={t("modals.saveNew.title")} onExit={toggleSaveNewQueryModal}>
      <form
        onSubmit={onClickSaveQuery}
        className={baseClass}
        autoComplete="off"
      >
        <InputField
          name="name"
          onChange={(value: string) => setName(value)}
          onBlur={() => {
            setName(name.trim());
          }}
          value={name}
          error={errors.name}
          inputClassName={`${baseClass}__name`}
          label={t("modals.saveNew.nameField")}
          autofocus
          ignore1password
        />
        <InputField
          name="description"
          onChange={(value: string) => setDescription(value)}
          value={description}
          inputClassName={`${baseClass}__description`}
          label={t("modals.saveNew.descriptionField")}
          type="textarea"
          helpText={t("modals.saveNew.descriptionHelpText")}
        />
        <Dropdown
          searchable={false}
          options={FREQUENCY_DROPDOWN_OPTIONS}
          onChange={(value: number) => {
            setSelectedFrequency(value);
          }}
          placeholder={t("schedule.daily")}
          value={selectedFrequency}
          label={t("modals.saveNew.intervalLabel")}
          wrapperClassName={`${baseClass}__form-field form-field--frequency`}
          helpText={t("modals.saveNew.intervalHelpText")}
        />
        <Checkbox
          name="observerCanRun"
          onChange={setObserverCanRun}
          value={observerCanRun}
          wrapperClassName="observer-can-run-wrapper"
          helpText={t("modals.saveNew.observersCanRunHelpText")}
        >
          {t("modals.saveNew.observersCanRun")}
        </Checkbox>
        <Slider
          onChange={() => setAutomationsEnabled(!automationsEnabled)}
          value={automationsEnabled}
          activeText={
            <>
              {t("modals.saveNew.automationsOn")}
              {selectedFrequency === 0 && (
                <TooltipWrapper
                  tipContent={t("modals.saveNew.automationsPausedTooltip")}
                  position="right"
                  tipOffset={9}
                  showArrow
                  underline={false}
                >
                  <Icon name="warning" />
                </TooltipWrapper>
              )}
            </>
          }
          inactiveText={t("modals.saveNew.automationsOff")}
          helpText={
            <>
              {t("modals.saveNew.automationsHelpText", {
                not: !automationsEnabled ? "not " : "",
              })}
              <b>
                <LogDestinationIndicator
                  logDestination={config?.logging.result.plugin || ""}
                  filesystemDestination={
                    config?.logging.result.config?.result_log_file
                  }
                  webhookDestination={config?.logging.result.config?.result_url}
                  excludeTooltip
                />
              </b>
              .
            </>
          }
        />
        {platformSelector.render()}
        {isPremiumTier && (
          <TargetLabelSelector
            selectedTargetType={selectedTargetType}
            selectedLabels={selectedLabels}
            className={`${baseClass}__target`}
            onSelectTargetType={setSelectedTargetType}
            onSelectLabel={onSelectLabel}
            labels={labels || []}
            customHelpText={
              <span className="form-field__help-text">
                {t("modals.saveNew.targetHelpText")}
              </span>
            }
            suppressTitle
          />
        )}
        <RevealButton
          isShowing={showAdvancedOptions}
          className="advanced-options-toggle"
          hideText={t("modals.saveNew.hideAdvanced")}
          showText={t("modals.saveNew.showAdvanced")}
          caretPosition="after"
          onClick={toggleAdvancedOptions}
        />
        {showAdvancedOptions && (
          <>
            <Dropdown
              options={MIN_OSQUERY_VERSION_OPTIONS}
              onChange={setSelectedMinOsqueryVersionOptions}
              placeholder={t("modals.saveNew.selectPlaceholder")}
              value={selectedMinOsqueryVersionOptions}
              label={t("modals.saveNew.minOsqueryVersion")}
              wrapperClassName={`${baseClass}__form-field ${baseClass}__form-field--osquer-vers`}
            />
            <Dropdown
              options={LOGGING_TYPE_OPTIONS}
              onChange={setSelectedLoggingType}
              placeholder={t("modals.saveNew.selectPlaceholder")}
              value={selectedLoggingType}
              label={t("modals.saveNew.logging")}
              wrapperClassName={`${baseClass}__form-field ${baseClass}__form-field--logging`}
            />
            {queryReportsDisabled !== undefined && (
              <DiscardDataOption
                {...{
                  queryReportsDisabled,
                  selectedLoggingType,
                  discardData,
                  setDiscardData,
                  breakHelpText: true,
                }}
              />
            )}
          </>
        )}
        <div className="modal-cta-wrap">
          <Button
            type="submit"
            className="save-query-loading"
            isLoading={isLoading || isFetchingLabels}
            disabled={!canSave}
          >
            {t("modals.saveNew.saveButton")}
          </Button>
          <Button onClick={toggleSaveNewQueryModal} variant="inverse">
            {t("modals.saveNew.cancelButton")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SaveNewQueryModal;
