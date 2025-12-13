import React, { useContext, useState } from "react";
import PATHS from "router/paths";
import { Link } from "react-router";
import { useQuery } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";

import { NotificationContext } from "context/notification";
import { IHost, IHostResponse } from "interfaces/host";
import { IHostPolicy } from "interfaces/policy";
import hostAPI from "services/entities/hosts";

import Spinner from "components/Spinner";
import Button from "components/buttons/Button";
import Modal from "components/Modal";
import Icon from "components/Icon/Icon";
import LaptopMac from "../../../../../assets/images/laptop-mac.png";
import SlackButton from "../../../../../assets/images/slack-button-get-help.png";

interface IWelcomeHostCardProps {
  totalsHostsCount: number;
  toggleAddHostsModal: (showAddHostsModal: boolean) => void;
}

const baseClass = "welcome-host";
const HOST_ID = 1;
const POLICY_PASS = "pass";
const POLICY_FAIL = "fail";

const WelcomeHost = ({
  totalsHostsCount,
  toggleAddHostsModal,
}: IWelcomeHostCardProps): JSX.Element => {
  const { t } = useTranslation();
  const { renderFlash } = useContext(NotificationContext);
  const [refetchStartTime, setRefetchStartTime] = useState<number | null>(null);
  const [currentPolicyShown, setCurrentPolicyShown] = useState<IHostPolicy>();
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [isPoliciesEmpty, setIsPoliciesEmpty] = useState(false);
  const [showRefetchLoadingSpinner, setShowRefetchLoadingSpinner] = useState(
    false
  );

  const {
    isLoading: isLoadingHost,
    data: host,
    error: loadingHostError,
    refetch: fullyReloadHost,
  } = useQuery<IHostResponse, Error, IHost>(
    ["host"],
    () => hostAPI.loadHostDetails(HOST_ID),
    {
      retry: false,
      select: (data: IHostResponse) => data.host,
      onSuccess: (returnedHost) => {
        setShowRefetchLoadingSpinner(returnedHost.refetch_requested);

        const anyPassingOrFailingPolicy = returnedHost?.policies?.find(
          (p) => p.response === POLICY_PASS || p.response === POLICY_FAIL
        );
        setIsPoliciesEmpty(typeof anyPassingOrFailingPolicy === "undefined");

        if (returnedHost.refetch_requested) {
          // Code duplicated from HostDetailsPage. See comments there.
          if (!refetchStartTime) {
            if (returnedHost.status === "online") {
              setRefetchStartTime(Date.now());
              setTimeout(() => {
                fullyReloadHost();
              }, 1000);
            } else {
              setShowRefetchLoadingSpinner(false);
            }
          } else {
            const totalElapsedTime = Date.now() - refetchStartTime;
            if (totalElapsedTime < 60000) {
              if (returnedHost.status === "online") {
                setTimeout(() => {
                  fullyReloadHost();
                }, 1000);
              } else {
                renderFlash(
                  "error",
                  t("dashboard:welcomeHost.refetchOfflineError")
                );
                setShowRefetchLoadingSpinner(false);
              }
            } else {
              renderFlash(
                "error",
                t("dashboard:welcomeHost.refetchTimeoutError")
              );
              setShowRefetchLoadingSpinner(false);
            }
          }
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const onRefetchHost = async () => {
    if (host) {
      setShowRefetchLoadingSpinner(true);

      try {
        await hostAPI.refetch(host).then(() => {
          setRefetchStartTime(Date.now());
          setTimeout(() => fullyReloadHost(), 1000);
        });
      } catch (error) {
        console.error(error);
        renderFlash(
          "error",
          t("dashboard:welcomeHost.refetchError", { name: host.display_name })
        );
        setShowRefetchLoadingSpinner(false);
      }
    }
  };

  const handlePolicyModal = (id: number) => {
    const policy = host?.policies.find((p) => p.id === id);

    if (policy) {
      setCurrentPolicyShown(policy);
      setShowPolicyModal(true);
    }
  };

  if (isLoadingHost) {
    return (
      <div className={baseClass}>
        <div className={`${baseClass}__loading`}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (loadingHostError) {
    return (
      <div className={baseClass}>
        <div className={`${baseClass}__empty-hosts`}>
          <p>{t("dashboard:welcomeHost.emptyDescription")}</p>
          <p>{t("dashboard:welcomeHost.emptySubtext")}</p>
          <Button
            onClick={toggleAddHostsModal}
            className={`${baseClass}__add-host`}
          >
            <span>{t("dashboard:welcomeHost.addHostsButton")}</span>
          </Button>
        </div>
      </div>
    );
  }

  if (totalsHostsCount === 1 && host && host.status === "offline") {
    return (
      <div className={baseClass}>
        <div className={`${baseClass}__error`}>
          <p className="error-message">
            <Icon name="disable" color="status-error" />
            {t("dashboard:welcomeHost.offlineError")}
          </p>
          <p>{t("dashboard:welcomeHost.offlineHelp")}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://osquery.slack.com/archives/C01DXJL16D8"
          >
            <img
              alt={t("dashboard:welcomeHost.slackAlt")}
              className="button-slack"
              src={SlackButton}
            />
          </a>
        </div>
      </div>
    );
  }

  if (isPoliciesEmpty) {
    return (
      <div className={baseClass}>
        <div className={`${baseClass}__error`}>
          <p className="error-message">
            <Icon name="disable" color="status-error" />
            {t("dashboard:welcomeHost.noPoliciesError")}
          </p>
          <p>{t("dashboard:welcomeHost.offlineHelp")}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://osquery.slack.com/archives/C01DXJL16D8"
          >
            <img
              alt={t("dashboard:welcomeHost.slackAlt")}
              className="button-slack"
              src={SlackButton}
            />
          </a>
        </div>
      </div>
    );
  }

  if (totalsHostsCount === 1 && host && host.status === "online") {
    return (
      <div className={baseClass}>
        <div className={`${baseClass}__intro`}>
          <img alt="" src={LaptopMac} />
          <div className="info">
            <Link to={PATHS.HOST_DETAILS(host.id)} className="external-link">
              {host.display_name}
              <Icon name="arrow-internal-link" />
            </Link>
            <p>{t("dashboard:welcomeHost.connectedSuccess")}</p>
          </div>
        </div>
        <div className={`${baseClass}__blurb`}>
          <p>{t("dashboard:welcomeHost.policiesBlurb")}</p>
        </div>
        <div className={`${baseClass}__policies`}>
          {host.policies?.slice(0, 3).map((p) => {
            if (p.response) {
              return (
                <Button
                  variant="unstyled"
                  onClick={() => handlePolicyModal(p.id)}
                >
                  <div className="policy-block">
                    <Icon
                      name={
                        p.response === POLICY_PASS ? "success" : "error-outline"
                      }
                    />
                    <span className="info">{p.name}</span>
                    <Icon
                      name="chevron-right"
                      color="ui-fleet-black-75"
                      className="policy-arrow"
                    />
                  </div>
                </Button>
              );
            }

            return null;
          })}
          {host.policies?.length > 3 && (
            <Link to={PATHS.HOST_POLICIES(host.id)} className="external-link">
              {t("dashboard:welcomeHost.viewAllPolicies")}
              <Icon name="arrow-internal-link" />
            </Link>
          )}
        </div>
        <div className={`${baseClass}__blurb`}>
          <p>{t("dashboard:welcomeHost.refetchBlurb")}</p>
        </div>
        <div className={`${baseClass}__refetch`}>
          <Button
            className={`refetch-spinner ${
              showRefetchLoadingSpinner ? "spin" : ""
            }`}
            onClick={onRefetchHost}
            disabled={showRefetchLoadingSpinner}
          >
            <Icon name="refresh" color="core-fleet-white" />{" "}
            {t("dashboard:welcomeHost.refetchButton")}
          </Button>
          <span>
            {t("dashboard:welcomeHost.lastUpdated")}{" "}
            {formatDistanceToNow(new Date(host.detail_updated_at), {
              addSuffix: true,
            })}
          </span>
        </div>
        {showPolicyModal && (
          <Modal
            title={currentPolicyShown?.name || ""}
            onExit={() => setShowPolicyModal(false)}
            onEnter={() => setShowPolicyModal(false)}
            className={`${baseClass}__policy-modal`}
          >
            <>
              <p>{currentPolicyShown?.description}</p>
              {currentPolicyShown?.resolution && (
                <p>
                  <b>{t("dashboard:welcomeHost.modalResolve")}</b>{" "}
                  {currentPolicyShown.resolution}
                </p>
              )}
              <div className="modal-cta-wrap">
                <Button onClick={() => setShowPolicyModal(false)}>
                  {t("dashboard:welcomeHost.modalDone")}
                </Button>
              </div>
            </>
          </Modal>
        )}
      </div>
    );
  }

  return <Spinner />;
};

export default WelcomeHost;
