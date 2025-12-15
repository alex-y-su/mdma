import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

import {
  DEFAULT_USE_QUERY_OPTIONS,
  LEARN_MORE_ABOUT_BASE_LINK,
} from "utilities/constants";
import PATHS from "router/paths";

import mdmAPI, {
  IGetSetupExperienceScriptResponse,
} from "services/entities/mdm";
import configAPI from "services/entities/config";
import teamsAPI, { ILoadTeamResponse } from "services/entities/teams";
import { IConfig } from "interfaces/config";
import { API_NO_TEAM_ID, ITeamConfig } from "interfaces/team";

import SectionHeader from "components/SectionHeader";
import DataError from "components/DataError";
import Spinner from "components/Spinner";
import CustomLink from "components/CustomLink";
import GenericMsgWithNavButton from "components/GenericMsgWithNavButton";

import SetupExperienceScriptUploader from "./components/SetupExperienceScriptUploader";
import SetupExperienceScriptCard from "./components/SetupExperienceScriptCard";
import DeleteSetupExperienceScriptModal from "./components/DeleteSetupExperienceScriptModal";
import SetupExperienceContentContainer from "../../components/SetupExperienceContentContainer";
import { ISetupExperienceCardProps } from "../../SetupExperienceNavItems";
import getManualAgentInstallSetting from "../../helpers";

const baseClass = "run-script";

const RunScript = ({ currentTeamId, router }: ISetupExperienceCardProps) => {
  const { t } = useTranslation("settings");
  const [showDeleteScriptModal, setShowDeleteScriptModal] = useState(false);

  const {
    data: script,
    error: scriptError,
    isLoading,
    isError: isScriptError,
    refetch: refetchScript,
    remove: removeScriptFromCache,
  } = useQuery<IGetSetupExperienceScriptResponse, AxiosError>(
    ["setup-experience-script", currentTeamId],
    () => mdmAPI.getSetupExperienceScript(currentTeamId),
    { ...DEFAULT_USE_QUERY_OPTIONS, retry: false }
  );

  const { data: globalConfig, isLoading: isLoadingGlobalConfig } = useQuery<
    IConfig,
    Error
  >(["config", currentTeamId], () => configAPI.loadAll(), {
    ...DEFAULT_USE_QUERY_OPTIONS,
  });

  const { data: teamConfig, isLoading: isLoadingTeamConfig } = useQuery<
    ILoadTeamResponse,
    Error,
    ITeamConfig
  >(["team", currentTeamId], () => teamsAPI.load(currentTeamId), {
    ...DEFAULT_USE_QUERY_OPTIONS,
    enabled: currentTeamId !== API_NO_TEAM_ID,
    select: (res) => res.team,
  });

  const onUpload = () => {
    refetchScript();
  };

  const onDelete = () => {
    removeScriptFromCache();
    setShowDeleteScriptModal(false);
    refetchScript();
  };

  const hasManualAgentInstall = getManualAgentInstallSetting(
    currentTeamId,
    globalConfig,
    teamConfig
  );

  const renderContent = () => {
    if (isLoading || isLoadingGlobalConfig || isLoadingTeamConfig) {
      return <Spinner />;
    }

    if (
      !(
        globalConfig?.mdm.enabled_and_configured &&
        globalConfig?.mdm.apple_bm_enabled_and_configured
      )
    ) {
      return (
        <GenericMsgWithNavButton
          header={t("controls.setupExperience.runScript.noScript")}
          info={t("controls.setupExperience.runScript.uploadDescription")}
          path={PATHS.ADMIN_INTEGRATIONS_MDM}
          buttonText={t("controls.setupExperience.runScript.uploadScript")}
          router={router}
        />
      );
    }

    if (isScriptError && scriptError.status !== 404) {
      return <DataError />;
    }

    return (
      <SetupExperienceContentContainer>
        <div className={`${baseClass}__description-container`}>
          <p className={`${baseClass}__description`}>
            {t("controls.setupExperience.runScript.uploadDescription")}
          </p>
          {!script ? (
            <SetupExperienceScriptUploader
              currentTeamId={currentTeamId}
              hasManualAgentInstall={hasManualAgentInstall}
              onUpload={onUpload}
            />
          ) : (
            <>
              <p className={`${baseClass}__run-message`}>
                {t("controls.setupExperience.runScript.description")}
              </p>
              <SetupExperienceScriptCard
                script={script}
                onDelete={() => setShowDeleteScriptModal(true)}
              />
            </>
          )}
        </div>
        {showDeleteScriptModal && script && (
          <DeleteSetupExperienceScriptModal
            currentTeamId={currentTeamId}
            scriptName={script.name}
            onDeleted={onDelete}
            onExit={() => setShowDeleteScriptModal(false)}
          />
        )}
      </SetupExperienceContentContainer>
    );
  };

  return (
    <section className={baseClass}>
      <SectionHeader
        title={t("controls.setupExperience.runScript.title")}
        details={
          <CustomLink
            newTab
            url={`${LEARN_MORE_ABOUT_BASE_LINK}/setup-experience/run-script`}
            text={t("controls.setupExperience.runScript.description")}
          />
        }
      />
      {renderContent()}
    </section>
  );
};

export default RunScript;
