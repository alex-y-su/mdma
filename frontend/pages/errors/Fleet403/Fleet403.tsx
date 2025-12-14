import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";

// @ts-ignore
import fleetLogoText from "../../../../assets/images/fleet-logo-text-white.svg";
// @ts-ignore
import backgroundImg from "../../../../assets/images/403.svg";

const baseClass = "fleet-403";

const Fleet403 = () => {
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
        alt="403 background"
        className="background-image"
      />
      <main>
        <h1>
          <span>{t("403.title")}</span>
        </h1>
        <p>{t("403.message")}</p>
      </main>
    </div>
  );
};

export default Fleet403;
