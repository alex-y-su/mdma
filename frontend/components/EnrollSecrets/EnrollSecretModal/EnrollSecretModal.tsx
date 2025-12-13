import React from "react";
import { Trans, useTranslation } from "react-i18next";

import { ITeam } from "interfaces/team";
import { IEnrollSecret } from "interfaces/enroll_secret";

import Card from "components/Card";
import EmptyTable from "components/EmptyTable";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";
import Modal from "components/Modal";
import Button from "components/buttons/Button";
import Icon from "components/Icon/Icon";
import EnrollSecretTable from "../EnrollSecretTable";

interface IEnrollSecretModal {
  selectedTeamId: number;
  primoMode: boolean;
  onReturnToApp: () => void;
  teams: ITeam[];
  toggleSecretEditorModal: () => void;
  toggleDeleteSecretModal: () => void;
  setSelectedSecret: React.Dispatch<
    React.SetStateAction<IEnrollSecret | undefined>
  >;
  globalSecrets?: IEnrollSecret[] | undefined;
}

const baseClass = "enroll-secret-modal";

const EnrollSecretModal = ({
  onReturnToApp,
  selectedTeamId,
  primoMode,
  teams,
  toggleSecretEditorModal,
  toggleDeleteSecretModal,
  setSelectedSecret,
  globalSecrets,
}: IEnrollSecretModal): JSX.Element => {
  const { t } = useTranslation();

  const teamInfo =
    selectedTeamId <= 0
      ? { name: t("common:enrollSecrets.noTeam"), secrets: globalSecrets }
      : teams.find((team) => team.id === selectedTeamId);

  const teamName = primoMode ? "" : teamInfo?.name || "";

  const addNewSecretClick = () => {
    setSelectedSecret(undefined);
    toggleSecretEditorModal();
  };

  const renderDescription = (hasSecrets: boolean) => {
    const key = hasSecrets
      ? "common:enrollSecrets.useSecrets"
      : "common:enrollSecrets.addSecrets";
    if (primoMode) {
      return t(key, { teamName: "" }).replace(" to .", ".");
    }
    return (
      <Trans
        i18nKey={key}
        values={{ teamName }}
        components={{ bold: <b /> }}
        defaults={
          hasSecrets
            ? "Use these secret(s) to enroll hosts to <bold>{{teamName}}</bold>."
            : "Add secret(s) to enroll hosts to <bold>{{teamName}}</bold>."
        }
      />
    );
  };

  return (
    <Modal
      onExit={onReturnToApp}
      onEnter={onReturnToApp}
      title={t("common:enrollSecrets.manageTitle")}
      className={baseClass}
    >
      <div className={`${baseClass} form`}>
        {teamInfo?.secrets?.length ? (
          <>
            <div className={`${baseClass}__header`}>
              <div className={`${baseClass}__description`}>
                {renderDescription(true)}
              </div>
              <div className={`${baseClass}__add-secret`}>
                <GitOpsModeTooltipWrapper
                  position="right"
                  tipOffset={8}
                  renderChildren={(disableChildren) => (
                    <Button
                      disabled={disableChildren}
                      onClick={addNewSecretClick}
                      className={`${baseClass}__add-secret-btn`}
                      variant="brand-inverse-icon"
                      iconStroke
                    >
                      {t("common:enrollSecrets.addTitle")}{" "}
                      <Icon name="plus" color="core-fleet-green" />
                    </Button>
                  )}
                />
              </div>
            </div>
            <EnrollSecretTable
              secrets={teamInfo?.secrets}
              toggleSecretEditorModal={toggleSecretEditorModal}
              toggleDeleteSecretModal={toggleDeleteSecretModal}
              setSelectedSecret={setSelectedSecret}
            />
          </>
        ) : (
          <Card color="grey" paddingSize="small">
            <EmptyTable
              header={t("common:enrollSecrets.noSecrets")}
              info={renderDescription(false)}
              primaryButton={
                <GitOpsModeTooltipWrapper
                  position="right"
                  tipOffset={8}
                  renderChildren={(disableChildren) => (
                    <Button
                      disabled={disableChildren}
                      onClick={addNewSecretClick}
                      className={`${baseClass}__add-secret-btn`}
                      variant="brand-inverse-icon"
                      iconStroke
                    >
                      {t("common:enrollSecrets.addTitle")}{" "}
                      <Icon name="plus" color="core-fleet-green" />
                    </Button>
                  )}
                />
              }
            />
          </Card>
        )}
        <div className="modal-cta-wrap">
          <Button onClick={onReturnToApp}>{t("common:buttons.done")}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollSecretModal;
