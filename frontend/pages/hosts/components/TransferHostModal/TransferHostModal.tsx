import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import PATHS from "router/paths";
import Modal from "components/Modal";
import Button from "components/buttons/Button";
// ignore TS error for now until these are rewritten in ts.
// @ts-ignore
import Dropdown from "components/forms/fields/Dropdown";
import { ITeam } from "interfaces/team";

interface ITransferHostModal {
  isGlobalAdmin: boolean;
  teams: ITeam[];
  onSubmit: (team: ITeam) => void;
  onCancel: () => void;
  isUpdating: boolean;
  /** Manage host page only */
  multipleHosts?: boolean;
}

interface INoTeamOption {
  id: string;
}

const baseClass = "transfer-host-modal";

const TransferHostModal = ({
  onCancel,
  onSubmit,
  teams,
  isGlobalAdmin,
  isUpdating,
  multipleHosts,
}: ITransferHostModal): JSX.Element => {
  const { t } = useTranslation();
  const [selectedTeam, setSelectedTeam] = useState<ITeam | INoTeamOption>();

  const NO_TEAM_OPTION = {
    value: "no-team",
    label: t("hosts:transferHostModal.noTeam"),
  };

  const onChangeSelectTeam = useCallback(
    (teamId: number | string) => {
      if (teamId === "no-team") {
        setSelectedTeam({ id: NO_TEAM_OPTION.value });
      } else {
        const teamWithId = teams.find((team) => team.id === teamId);
        setSelectedTeam(teamWithId as ITeam);
      }
    },
    [teams, setSelectedTeam, NO_TEAM_OPTION.value]
  );

  const onSubmitTransferHost = useCallback(() => {
    onSubmit(selectedTeam as ITeam);
  }, [onSubmit, selectedTeam]);

  const createTeamDropdownOptions = () => {
    const teamOptions = teams.map((team) => {
      return {
        value: team.id,
        label: team.name,
      };
    });
    return [NO_TEAM_OPTION, ...teamOptions];
  };

  return (
    <Modal
      onExit={onCancel}
      title={t("hosts:transferHostModal.title")}
      className={baseClass}
    >
      <>
        <form className={`${baseClass}__form`}>
          <Dropdown
            wrapperClassName={`${baseClass}__team-dropdown-wrapper`}
            label={
              multipleHosts
                ? t("hosts:transferHostModal.labelMultiple")
                : t("hosts:transferHostModal.labelSingle")
            }
            value={selectedTeam && selectedTeam.id}
            options={createTeamDropdownOptions()}
            onChange={onChangeSelectTeam}
            placeholder={t("hosts:transferHostModal.selectTeam")}
            searchable={false}
            autoFocus
          />
          {isGlobalAdmin ? (
            <p>
              {t("hosts:transferHostModal.teamNotHere")}{" "}
              <Link
                to={PATHS.ADMIN_TEAMS}
                className={`${baseClass}__team-link`}
              >
                {t("hosts:transferHostModal.createTeam")}
              </Link>
            </p>
          ) : null}
          <div className="modal-cta-wrap">
            <Button
              disabled={selectedTeam === undefined}
              type="button"
              onClick={onSubmitTransferHost}
              className="transfer-loading"
              isLoading={isUpdating}
            >
              {t("hosts:transferHostModal.transfer")}
            </Button>
            <Button onClick={onCancel} variant="inverse">
              {t("hosts:transferHostModal.cancel")}
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default TransferHostModal;
