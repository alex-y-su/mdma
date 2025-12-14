import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";

import { SUPPORT_LINK } from "utilities/constants";
import Button from "components/buttons/Button";

// @ts-ignore
import fleetLogoText from "../../../../assets/images/fleet-logo-text-white.svg";
// @ts-ignore
import backgroundImg from "../../../../assets/images/404.svg";
import githubLogo from "../../../../assets/images/github-mark-white-24x24@2x.png";
import slackLogo from "../../../../assets/images/logo-slack-24x24@2x.png";

const baseClass = "fleet-404";

const Fleet404 = () => {
  const { t } = useTranslation("errors");

  return (
    <div className={baseClass}>
      <header className="primary-header">
        <Link to={PATHS.DASHBOARD}>
          <img
            className="primary-header__logo"
            src={fleetLogoText}
            alt="Fleet logo"
          />
        </Link>
      </header>
      <img
        src={backgroundImg}
        alt="404 background"
        className="background-image"
      />
      <main>
        <h1>
          <span>{t("404.code")}:</span> {t("404.title")}
        </h1>
        <p>{t("404.description")}</p>
        <div className={`${baseClass}__button-wrapper`}>
          <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer">
            <Button
              type="button"
              variant="unstyled"
              className={`${baseClass}__slack-btn`}
            >
              <>
                <img src={slackLogo} alt="Slack icon" />
                {t("404.actions.getHelpSlack")}
              </>
            </Button>
          </a>
          <a
            href="https://github.com/fleetdm/fleet/issues/new?assignees=&labels=bug%2C%3Areproduce&template=bug-report.md&title="
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="button">
              <>
                <img src={githubLogo} alt="Github icon" />
                {t("404.actions.fileIssue")}
              </>
            </Button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Fleet404;
