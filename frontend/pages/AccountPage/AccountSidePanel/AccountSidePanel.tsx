import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IUser } from "interfaces/user";
import { IVersionData } from "interfaces/version";

import { AppContext } from "context/app";

import versionAPI from "services/entities/version";

import Avatar from "components/Avatar";
import DataSet from "components/DataSet";
import Button from "components/buttons/Button";
import { HumanTimeDiffWithDateTip } from "components/HumanTimeDiffWithDateTip";

import {
  generateRole,
  generateTeam,
  greyCell,
  readableDate,
} from "utilities/helpers";

interface IAccountSidePanelProps {
  currentUser: IUser;
  onChangePassword: () => void;
  onGetApiToken: () => void;
}

const baseClass = "account-side-panel";

const AccountSidePanel = ({
  currentUser,
  onChangePassword,
  onGetApiToken,
}: IAccountSidePanelProps): JSX.Element => {
  const { t } = useTranslation("auth");
  const { isPremiumTier, config } = useContext(AppContext);
  const [versionData, setVersionData] = useState<IVersionData>();

  useEffect(() => {
    const getVersionData = async () => {
      try {
        const data = await versionAPI.load();
        setVersionData(data);
      } catch (response) {
        console.error(response);
        return false;
      }
    };

    getVersionData();
  }, []);

  const {
    global_role: globalRole,
    updated_at: updatedAt,
    sso_enabled: ssoEnabled,
    teams,
  } = currentUser;

  const roleText = generateRole(teams, globalRole);
  const teamsText = generateTeam(teams, globalRole);

  const lastUpdatedAt = updatedAt && (
    <HumanTimeDiffWithDateTip timeString={updatedAt} />
  );

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__change-avatar`}>
        <Avatar user={currentUser} className={`${baseClass}__avatar`} />
        <a
          href="https://en.gravatar.com/emails/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("account.changePhotoGravatar")}
        </a>
      </div>
      {isPremiumTier && (
        <DataSet
          title={t("account.teams")}
          value={
            <span
              className={`${
                greyCell(teamsText) ? `${baseClass}__grey-text` : ""
              }`}
            >
              {teamsText}
            </span>
          }
        />
      )}
      <DataSet title={t("account.role")} value={roleText} />
      {isPremiumTier && config && (
        <DataSet
          title={t("account.licenseExpiration")}
          value={readableDate(config.license.expiration)}
        />
      )}
      <DataSet
        title={t("account.password")}
        value={
          <div className={`${baseClass}__password-info`}>
            <Button
              onClick={onChangePassword}
              disabled={ssoEnabled}
              className={`${baseClass}__button`}
            >
              {t("account.changePasswordButton")}
            </Button>
            <div className={`${baseClass}__last-updated`}>
              {t("account.lastChanged")}: {lastUpdatedAt}
            </div>
          </div>
        }
      />
      <Button onClick={onGetApiToken} className={`${baseClass}__button`}>
        {t("account.getApiToken")}
      </Button>
      <span
        className={`${baseClass}__version`}
      >{`Fleet ${versionData?.version} • Go ${versionData?.go_version}`}</span>
      <span className={`${baseClass}__privacy-policy`}>
        <a
          href="https://fleetdm.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("account.privacyPolicy")}
        </a>
      </span>
    </div>
  );
};

export default AccountSidePanel;
