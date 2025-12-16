import React from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { ITokenTeam } from "interfaces/mdm";

import TextCell from "components/TableContainer/DataTable/TextCell";
import { uniqueId } from "lodash";
import ReactTooltip from "react-tooltip";

const baseClass = "teams-cell";

const NUM_TEAMS_IN_TOOLTIP = 3;

const generateCell = (
  teams: ITokenTeam[] | null,
  t: (key: string, options?: any) => string
) => {
  if (!teams) {
    return <TextCell value="---" grey />;
  }

  if (teams.length === 0) {
    return <TextCell value={t("mdmSettings.vpp.allTeams")} />;
  }

  let text = "";
  let italicize = true;
  if (teams.length === 1) {
    italicize = false;
    text = teams[0].name;
  } else {
    text = t("mdmSettings.vpp.teamsCount", { count: teams.length });
  }

  return <TextCell value={text} italic={italicize} />;
};

const condenseTeams = (
  teams: ITokenTeam[],
  t: (key: string, options?: any) => string
) => {
  const condensed =
    (teams?.length &&
      teams
        .slice(-NUM_TEAMS_IN_TOOLTIP)
        .map((team) => team.name)
        .reverse()) ||
    [];

  return teams.length > NUM_TEAMS_IN_TOOLTIP
    ? condensed.concat(
        t("mdmSettings.vpp.moreTeams", {
          count: teams.length - NUM_TEAMS_IN_TOOLTIP,
        })
      )
    : condensed;
};

const generateTooltip = (
  teams: ITokenTeam[] | null,
  tooltipId: string,
  t: (key: string, options?: any) => string
) => {
  if (teams === null || teams.length <= 1) {
    return null;
  }

  const condensedTeams = condenseTeams(teams, t);

  return (
    <ReactTooltip
      effect="solid"
      backgroundColor="#3e4771"
      id={tooltipId}
      data-html
    >
      <ul className={`${baseClass}__team-list`}>
        {condensedTeams.map((teamName) => {
          return <li key={teamName}>{teamName}</li>;
        })}
      </ul>
    </ReactTooltip>
  );
};

interface ITeamsCellProps {
  teams: ITokenTeam[] | null;
  className?: string;
}

const TeamsCell = ({ teams, className }: ITeamsCellProps) => {
  const { t } = useTranslation("settings");
  const tooltipId = uniqueId();
  const classNames = classnames(baseClass, className);

  if (!teams) {
    return <TextCell value={teams} />;
  }

  if (teams.length === 0) {
    return <TextCell value={t("mdmSettings.vpp.allTeams")} />;
  }

  if (teams.length === 1) {
    return <TextCell value={teams[0].name} />;
  }

  const cell = generateCell(teams, t);
  const tooltip = generateTooltip(teams, tooltipId, t);

  return (
    <>
      <div
        className={`${baseClass}__team-text-with-tooltip`}
        data-tip
        data-for={tooltipId}
      >
        {cell}
      </div>
      {tooltip}
    </>
  );
};

export default TeamsCell;
