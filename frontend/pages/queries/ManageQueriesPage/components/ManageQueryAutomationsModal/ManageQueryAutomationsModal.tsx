import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import { ISchedulableQuery } from "interfaces/schedulable_query";
import { LogDestination } from "interfaces/config";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink/CustomLink";
import Checkbox from "components/forms/fields/Checkbox/Checkbox";
import QueryFrequencyIndicator from "components/QueryFrequencyIndicator/QueryFrequencyIndicator";
import LogDestinationIndicator from "components/LogDestinationIndicator/LogDestinationIndicator";
import TooltipTruncatedText from "components/TooltipTruncatedText";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

interface IManageQueryAutomationsModalProps {
  isUpdatingAutomations: boolean;
  onSubmit: (formData: any) => void; // TODO
  onCancel: () => void;
  isShowingPreviewDataModal: boolean;
  togglePreviewDataModal: () => void;
  availableQueries?: ISchedulableQuery[];
  automatedQueryIds: number[];
  logDestination: LogDestination;
  webhookDestination?: string;
  filesystemDestination?: string;
}

interface ICheckedQuery {
  name?: string;
  id: number;
  isChecked: boolean;
  interval: number;
}

const useCheckboxListStateManagement = (
  allQueries: ISchedulableQuery[],
  automatedQueryIds: number[] | undefined
) => {
  const [queryItems, setQueryItems] = useState<ICheckedQuery[]>(() => {
    return allQueries.map(({ name, id, interval }) => ({
      name,
      id,
      isChecked: !!automatedQueryIds?.includes(id),
      interval,
    }));
  });

  const updateQueryItems = (queryId: number) => {
    setQueryItems((prevItems) =>
      prevItems.map((query) =>
        query.id !== queryId ? query : { ...query, isChecked: !query.isChecked }
      )
    );
  };

  return { queryItems, updateQueryItems };
};

const baseClass = "manage-query-automations-modal";

const ManageQueryAutomationsModal = ({
  isUpdatingAutomations,
  automatedQueryIds,
  onSubmit,
  onCancel,
  isShowingPreviewDataModal,
  togglePreviewDataModal,
  availableQueries,
  logDestination,
  webhookDestination,
  filesystemDestination,
}: IManageQueryAutomationsModalProps): JSX.Element => {
  const { t } = useTranslation("queries");
  // TODO: Error handling, if any
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const gitOpsModeEnabled = useContext(AppContext).config?.gitops
    .gitops_mode_enabled;

  // Client side sort queries alphabetically
  const sortedAvailableQueries =
    availableQueries?.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    ) || [];

  const { queryItems, updateQueryItems } = useCheckboxListStateManagement(
    sortedAvailableQueries,
    automatedQueryIds || []
  );

  const onSubmitQueryAutomations = (
    evt: React.MouseEvent<HTMLFormElement> | KeyboardEvent
  ) => {
    evt.preventDefault();

    const newQueryIds: number[] = [];
    queryItems?.forEach((p) => p.isChecked && newQueryIds.push(p.id));

    onSubmit(newQueryIds);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        onSubmit(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <Modal
      title={t("automations.manage")}
      onExit={onCancel}
      className={baseClass}
      width="large"
      isHidden={isShowingPreviewDataModal}
    >
      <div className={`${baseClass} form`}>
        <div className={`${baseClass}__heading`}>
          {t("modals.manageAutomations.description")}
        </div>
        {availableQueries?.length ? (
          <div className={`${baseClass}__select form-field`}>
            <div className="form-field__label">
              {t("modals.manageAutomations.selectLabel")}
            </div>
            <div className={`${baseClass}__checkboxes`}>
              {queryItems &&
                queryItems.map((queryItem) => {
                  const { isChecked, name, id, interval } = queryItem;
                  return (
                    <div key={id} className={`${baseClass}__query-item`}>
                      <Checkbox
                        value={isChecked}
                        name={name}
                        onChange={() => {
                          updateQueryItems(id);
                        }}
                        disabled={gitOpsModeEnabled}
                      >
                        <TooltipTruncatedText value={name} />
                      </Checkbox>
                      <QueryFrequencyIndicator
                        frequency={interval}
                        checked={isChecked}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className={`${baseClass}__no-queries`}>
            <b>{t("modals.manageAutomations.noQueries")}</b>
            <p>{t("modals.manageAutomations.addQueryPrompt")}</p>
          </div>
        )}
        <div className={`${baseClass}__log-destination form-field`}>
          <div className="form-field__label">
            {t("modals.manageAutomations.logDestination")}
          </div>
          <div className={`${baseClass}__selection`}>
            <LogDestinationIndicator
              logDestination={logDestination}
              webhookDestination={webhookDestination}
              filesystemDestination={filesystemDestination}
            />
          </div>
          <div className={`${baseClass}__configure form-field__help-text`}>
            {t("modals.manageAutomations.configureHelpText")}&nbsp;
            <CustomLink
              url="https://fleetdm.com/docs/using-fleet/log-destinations"
              text={t("modals.manageAutomations.configureLinkText")}
              newTab
            />
          </div>
        </div>
        <Button
          type="button"
          variant="inverse"
          onClick={togglePreviewDataModal}
          className={`${baseClass}__preview-data`}
        >
          {t("modals.previewData.title")}
        </Button>
        <div className="modal-cta-wrap">
          <GitOpsModeTooltipWrapper
            tipOffset={6}
            renderChildren={(disableChildren) => (
              <Button
                type="submit"
                onClick={onSubmitQueryAutomations}
                className="save-loading"
                isLoading={isUpdatingAutomations}
                disabled={disableChildren}
              >
                {t("modals.saveNew.saveButton")}
              </Button>
            )}
          />
          <Button onClick={onCancel} variant="inverse">
            {t("modals.saveNew.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ManageQueryAutomationsModal;
