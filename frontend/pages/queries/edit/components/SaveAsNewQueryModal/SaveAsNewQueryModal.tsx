import React, { useCallback, useContext, useState } from "react";
import { InjectedRouter } from "react-router";
import { Location } from "history";
import { useTranslation } from "react-i18next";
import { AppContext } from "context/app";

import PATHS from "router/paths";

import { getPathWithQueryParams } from "utilities/url";

import { ICreateQueryRequestBody } from "interfaces/schedulable_query";

import queryAPI from "services/entities/queries";
import { NotificationContext } from "context/notification";

import { getErrorReason } from "interfaces/errors";
import {
  INVALID_PLATFORMS_FLASH_MESSAGE,
  INVALID_PLATFORMS_REASON,
} from "utilities/constants";
import {
  API_ALL_TEAMS_ID,
  APP_CONTEXT_ALL_TEAMS_ID,
  ITeamSummary,
} from "interfaces/team";
import Modal from "components/Modal";
import Button from "components/buttons/Button";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
import TeamsDropdown from "components/TeamsDropdown";
import { useTeamIdParam } from "hooks/useTeamIdParam";

const baseClass = "save-as-new-query-modal";

interface ISaveAsNewQueryModal {
  router: InjectedRouter;
  location: Location;
  initialQueryData: ICreateQueryRequestBody;
  onExit: () => void;
}

interface ISANQFormData {
  queryName: string;
  team: Partial<ITeamSummary>;
}

interface ISANQFormErrors {
  queryName?: string;
  team?: string;
}

const validateFormData = (formData: ISANQFormData, t: any): ISANQFormErrors => {
  const errors: ISANQFormErrors = {};

  if (!formData.queryName || formData.queryName.trim() === "") {
    errors.queryName = t("modals.saveAsNewQuery.nameRequired");
  }

  return errors;
};

const SaveAsNewQueryModal = ({
  router,
  location,
  initialQueryData,
  onExit,
}: ISaveAsNewQueryModal) => {
  const { t } = useTranslation("queries");
  const { renderFlash } = useContext(NotificationContext);
  const { isPremiumTier } = useContext(AppContext);

  const [formData, setFormData] = useState<ISANQFormData>({
    queryName: `Copy of ${initialQueryData.name}`,
    team: {
      id: initialQueryData.team_id,
      name: undefined,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState<ISANQFormErrors>({});

  const { userTeams } = useTeamIdParam({
    router,
    location,
    includeAllTeams: true,
    includeNoTeam: false,
    permittedAccessByTeamRole: {
      admin: true,
      maintainer: true,
      observer: false,
      observer_plus: false,
    },
  });

  const onInputChange = useCallback(
    ({
      name,
      value,
    }: {
      name: string;
      value: string | Partial<ITeamSummary>;
    }) => {
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);

      const newErrors = validateFormData(newFormData, t);
      const errsToSet: ISANQFormErrors = {};
      Object.keys(formErrors).forEach((k) => {
        if (k in newErrors) {
          errsToSet[k as keyof ISANQFormErrors] =
            newErrors[k as keyof ISANQFormErrors];
        }
      });

      setFormErrors(errsToSet);
    },
    [formData, formErrors, t]
  );

  const onInputBlur = () => {
    setFormErrors(validateFormData(formData, t));
  };

  const onTeamChange = useCallback(
    (teamId: number) => {
      const selectedTeam = userTeams?.find((team) => team.id === teamId);
      setFormData((prevData) => ({
        ...prevData,
        team: {
          id: teamId,
          name: selectedTeam ? selectedTeam.name : undefined,
        },
      }));
    },
    [userTeams]
  );

  // take all existing data for query from parent, allow editing name and team
  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const errors = validateFormData(formData, t);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);
    const {
      queryName,
      team: { id: teamId, name: teamName },
    } = formData;
    const createBody = {
      ...initialQueryData,
      name: queryName,
      team_id: teamId === APP_CONTEXT_ALL_TEAMS_ID ? API_ALL_TEAMS_ID : teamId,
    };
    try {
      const { query: newQuery } = await queryAPI.create(createBody);
      setIsSaving(false);
      renderFlash("success", t("modals.saveAsNewQuery.success", { name: newQuery.name }));
      router.push(
        getPathWithQueryParams(PATHS.QUERY_DETAILS(newQuery.id), {
          team_id: newQuery.team_id,
        })
      );
    } catch (createError: unknown) {
      let errFlash = t("modals.saveAsNewQuery.error");
      const reason = getErrorReason(createError);
      if (reason.includes("already exists")) {
        let teamText;
        if (teamId !== APP_CONTEXT_ALL_TEAMS_ID) {
          teamText = teamName ? t("editPage.teamText", { teamName }) : "this team";
        } else {
          teamText = t("editPage.allTeams");
        }
        errFlash = t("modals.saveAsNewQuery.duplicateError", { name: queryName, team: teamText });
      } else if (reason.includes(INVALID_PLATFORMS_REASON)) {
        errFlash = INVALID_PLATFORMS_FLASH_MESSAGE;
      }
      setIsSaving(false);
      renderFlash("error", errFlash);
    }
  };

  return (
    <Modal title={t("modals.saveAsNewQuery.title")} onExit={onExit}>
      <form onSubmit={handleSave} className={baseClass}>
        <InputField
          name="queryName"
          onChange={onInputChange}
          onBlur={onInputBlur}
          value={formData.queryName}
          error={formErrors.queryName}
          inputClassName={`${baseClass}__name`}
          label={t("modals.saveAsNewQuery.nameLabel")}
          autofocus
          ignore1password
          parseTarget
        />
        {isPremiumTier && (userTeams?.length || 0) > 1 && (
          <div className="form-field">
            <div className="form-field__label">{t("modals.saveAsNewQuery.teamLabel")}</div>
            <TeamsDropdown
              asFormField
              currentUserTeams={userTeams || []}
              selectedTeamId={formData.team.id}
              onChange={onTeamChange}
            />
          </div>
        )}
        <div className="modal-cta-wrap">
          <Button
            type="submit"
            className="save-as-new-query"
            isLoading={isSaving}
            // empty SQL error handled by parent
            disabled={Object.keys(formErrors).length > 0 || isSaving}
          >
            {t("modals.saveAsNewQuery.saveButton")}
          </Button>
          <Button onClick={onExit} variant="inverse">
            {t("modals.saveAsNewQuery.cancelButton")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SaveAsNewQueryModal;
