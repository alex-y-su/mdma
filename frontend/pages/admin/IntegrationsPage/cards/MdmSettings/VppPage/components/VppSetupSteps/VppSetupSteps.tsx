import CustomLink from "components/CustomLink";
import React from "react";
import { useTranslation } from "react-i18next";

const baseClass = "vpp-setup-steps";

interface IVppSetupStepsProps {
  /** This prop is used to display additional setup steps content. We have this
   * because some places that use this component show additional content.
   */
  extendendSteps?: boolean;
}

const VppSetupSteps = ({ extendendSteps = false }: IVppSetupStepsProps) => {
  const { t } = useTranslation("settings");
  return (
    <ol className={baseClass}>
      <li>
        <span>1.</span>
        <p>
          {t("mdmSettings.vpp.setup.step1Start")}{" "}
          <CustomLink
            newTab
            url="https://business.apple.com"
            text={t("mdmSettings.vpp.setup.abmLink")}
          />
          {extendendSteps && (
            <>
              <br />
              {t("mdmSettings.vpp.setup.step1Extended")}
            </>
          )}
        </p>
      </li>
      <li>
        <span>2.</span>
        <p>{t("mdmSettings.vpp.setup.step2")}</p>
      </li>
      <li>
        <span>3.</span>
        <p>{t("mdmSettings.vpp.setup.step3")}</p>
      </li>
      <li>
        <span>4.</span>
        <p>
          {t("mdmSettings.vpp.setup.step4")}
          {extendendSteps && (
            <>
              <br /> {t("mdmSettings.vpp.setup.step4Extended")}
            </>
          )}
        </p>
      </li>
      <li>
        <span>5.</span>
        <p>{t("mdmSettings.vpp.setup.step5")}</p>
      </li>
    </ol>
  );
};

export default VppSetupSteps;
