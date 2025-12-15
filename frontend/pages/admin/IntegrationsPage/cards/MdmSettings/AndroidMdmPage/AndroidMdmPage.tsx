import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { InjectedRouter } from "react-router";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";
import mdmAndroidAPI from "services/entities/mdm_android";
import { DEFAULT_USE_QUERY_OPTIONS, SUPPORT_LINK } from "utilities/constants";

import MainContent from "components/MainContent";
import BackButton from "components/BackButton";
import Button from "components/buttons/Button";
import DataSet from "components/DataSet";
import TooltipWrapper from "components/TooltipWrapper";
import CustomLink from "components/CustomLink";
import Spinner from "components/Spinner";
import DataError from "components/DataError";

import TurnOffAndroidMdmModal from "./components/TurnOffAndroidMdmModal";

const baseClass = "android-mdm-page";

const POPUP_WIDTH = 885;
const POPUP_HEIGHT = 600;

interface ITurnOnAndroidMdmProps {
  router: InjectedRouter;
}

const TurnOnAndroidMdm = ({ router }: ITurnOnAndroidMdmProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);

  // TODO: figure out issue with aborting the SSE fetch when the window is closed
  const newWindow = useRef<Window | null>(null);

  const [fetchingSignupUrl, setFetchingSignupUrl] = useState(false);
  const [setupSse, setSetupSse] = useState(false);

  const handleSSE = useCallback(
    async (abortController: AbortController) => {
      try {
        await mdmAndroidAPI.startSSE(abortController.signal);
        abortController.abort();
        renderFlash("success", t("mdmSettings.android.turnOnSuccess"), {
          persistOnPageChange: true,
        });
        setSetupSse(false);
        router.push(PATHS.ADMIN_INTEGRATIONS_MDM);
      } catch {
        renderFlash("error", t("mdmSettings.android.turnOnError"));
        setSetupSse(false);
      }
    },
    [renderFlash, router, t]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (setupSse) {
      handleSSE(abortController);

      return () => {
        abortController.abort();
      };
    }
  }, [setupSse, router, renderFlash, handleSSE]);

  const onConnectMdm = async () => {
    setFetchingSignupUrl(true);
    try {
      const res = await mdmAndroidAPI.getSignupUrl();

      // Calculate the center position
      const left = window.screenX + (window.innerWidth - POPUP_WIDTH) / 2;
      const top = window.screenY + (window.innerHeight - POPUP_HEIGHT) / 2;

      // TODO: figure out issue with aborting the SSE fetch when the window is closed
      newWindow.current = window.open(
        res.android_enterprise_signup_url,
        "_blank",
        `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`
      );
      setSetupSse(true);
    } catch (e: any) {
      if (
        e.data?.errors &&
        e.data.errors[0].reason?.includes("android enterprise already exists")
      ) {
        renderFlash(
          "error",
          <>
            {t("mdmSettings.android.connectErrorExists")}{" "}
            <CustomLink
              text={t("mdmSettings.android.fleetSupport")}
              url={SUPPORT_LINK}
              newTab
              variant="flash-message-link"
            />
          </>
        );
      } else {
        renderFlash("error", t("mdmSettings.android.connectError"));
      }
    }
    setFetchingSignupUrl(false);
  };

  return (
    <>
      <div className={`${baseClass}__turn-on-description`}>
        <p>{t("mdmSettings.android.connectDescription")} </p>
        <CustomLink
          text={t("mdmSettings.android.learnMore")}
          newTab
          url="https://fleetdm.com/learn-more-about/how-to-connect-android-enterprise"
        />
      </div>
      <Button isLoading={fetchingSignupUrl} onClick={onConnectMdm}>
        {t("mdmSettings.android.connectButton")}
      </Button>
    </>
  );
};

interface ITurnOffAndroidMdmProps {
  onClickTurnOff: () => void;
}

const TurnOffAndroidMdm = ({ onClickTurnOff }: ITurnOffAndroidMdmProps) => {
  const { t } = useTranslation("settings");
  const { data, isLoading, isError } = useQuery(
    ["android_enterprise"],
    () => mdmAndroidAPI.getAndroidEnterprise(),
    {
      ...DEFAULT_USE_QUERY_OPTIONS,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <DataError />;
  }

  if (!data) return null;

  return (
    <>
      <DataSet
        title={
          <TooltipWrapper
            position="top"
            tipContent={
              <>
                {t("mdmSettings.android.enterpriseInConsole")}{" "}
                <CustomLink
                  newTab
                  text={t("mdmSettings.android.googleAdminConsole")}
                  url="https://fleetdm.com/learn-more-about/google-admin-emm"
                  variant="tooltip-link"
                />
              </>
            }
          >
            {t("mdmSettings.android.enterpriseId")}
          </TooltipWrapper>
        }
        value={data.android_enterprise_id}
      />
      <Button onClick={onClickTurnOff}>{t("mdmSettings.android.turnOffButton")}</Button>
    </>
  );
};

interface IAndroidMdmPageProps {
  router: InjectedRouter;
}

const AndroidMdmPage = ({ router }: IAndroidMdmPageProps) => {
  const { t } = useTranslation("settings");
  const { isAndroidMdmEnabledAndConfigured } = useContext(AppContext);
  const [showTurnOffMdmModal, setShowTurnOffMdmModal] = useState(false);

  return (
    <MainContent className={baseClass}>
      <div className={`${baseClass}__header-links`}>
        <BackButton
          text={t("mdmSettings.android.backToMdm")}
          path={PATHS.ADMIN_INTEGRATIONS_MDM}
          className={`${baseClass}__back-to-mdm`}
        />
      </div>
      <h1>{t("mdmSettings.android.pageTitle")}</h1>

      <div className={`${baseClass}__content`}>
        {!isAndroidMdmEnabledAndConfigured ? (
          <TurnOnAndroidMdm router={router} />
        ) : (
          <TurnOffAndroidMdm
            onClickTurnOff={() => setShowTurnOffMdmModal(true)}
          />
        )}
      </div>
      {showTurnOffMdmModal && (
        <TurnOffAndroidMdmModal
          router={router}
          onExit={() => setShowTurnOffMdmModal(false)}
        />
      )}
    </MainContent>
  );
};

export default AndroidMdmPage;
