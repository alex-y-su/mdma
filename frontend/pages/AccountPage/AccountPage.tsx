import React, { useState, useContext } from "react";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";
import { IUser } from "interfaces/user";
import usersAPI from "services/entities/users";
import { authToken } from "utilities/local";
import deepDifference from "utilities/deep_difference";
import formatErrorResponse from "utilities/format_error_response";

import Button from "components/buttons/Button";
// @ts-ignore
import ChangeEmailForm from "components/forms/ChangeEmailForm";
// @ts-ignore
import ChangePasswordForm from "components/forms/ChangePasswordForm";
// @ts-ignore
import Modal from "components/Modal";

import SidePanelPage from "components/SidePanelPage";
// @ts-ignore
import UserSettingsForm from "components/forms/UserSettingsForm";
import InfoBanner from "components/InfoBanner";
import MainContent from "components/MainContent";
import SidePanelContent from "components/SidePanelContent";
import CustomLink from "components/CustomLink";

import InputFieldHiddenContent from "components/forms/fields/InputFieldHiddenContent";
import AccountSidePanel from "./AccountSidePanel";
import { getErrorMessage } from "./helpers";

const baseClass = "account-page";

interface IAccountPageProps {
  router: InjectedRouter;
}

const AccountPage = ({ router }: IAccountPageProps): JSX.Element | null => {
  const { t } = useTranslation("auth");
  const { config, currentUser } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const [pendingEmail, setPendingEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>({});
  const [showApiTokenModal, setShowApiTokenModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onCancel = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    return router.goBack();
  };

  const onShowPasswordModal = () => {
    setShowPasswordModal(true);
    return false;
  };

  const onShowApiTokenModal = () => {
    setShowApiTokenModal(true);
    return false;
  };

  const onToggleEmailModal = (updated = {}) => {
    setShowEmailModal(!showEmailModal);
    setUpdatedUser(updated);
    return false;
  };

  const onTogglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
    return false;
  };

  const onToggleApiTokenModal = () => {
    setShowApiTokenModal(!showApiTokenModal);
    return false;
  };

  const handleSubmit = async (formData: any) => {
    if (!currentUser) {
      return false;
    }

    const updated = deepDifference(formData, currentUser);

    if (updated.email && !updated.password) {
      return onToggleEmailModal(updated);
    }

    try {
      await usersAPI.update(currentUser.id, updated);
      let accountUpdatedFlashMessage = t("account.updated");
      if (updated.email) {
        // always present, this for typing
        const senderAddressMessage = config?.smtp_settings?.sender_address
          ? ` from ${config?.smtp_settings?.sender_address}`
          : "";
        accountUpdatedFlashMessage += `: ${t("account.emailConfirmationSent", {
          senderAddress: senderAddressMessage,
          email: updated.email,
        })}`;
        setPendingEmail(updated.email);
      }

      renderFlash("success", accountUpdatedFlashMessage);
      return true;
    } catch (response) {
      const errorObject = formatErrorResponse(response);
      setErrors(errorObject);
      renderFlash(
        "error",
        errorObject.base.includes("already exists")
          ? t("account.errors.emailExists")
          : t("account.errors.updateFailed")
      );

      setShowEmailModal(false);
      return false;
    }
  };

  const handleSubmitPasswordForm = async (formData: any) => {
    try {
      await usersAPI.changePassword(formData);
      renderFlash("success", t("changePassword.success"));
      setShowPasswordModal(false);
    } catch (e) {
      renderFlash("error", getErrorMessage(e));
    }
  };

  const renderEmailModal = () => {
    const emailSubmit = (formData: any) => {
      handleSubmit(formData).then((r?: boolean) => {
        return r ? onToggleEmailModal() : false;
      });
    };

    if (!showEmailModal) {
      return false;
    }

    return (
      <Modal title={t("changeEmail.title")} onExit={onToggleEmailModal}>
        <ChangeEmailForm
          formData={updatedUser}
          handleSubmit={emailSubmit}
          onCancel={onToggleEmailModal}
          serverErrors={errors}
        />
      </Modal>
    );
  };

  const renderPasswordModal = () => {
    if (!showPasswordModal) {
      return false;
    }

    return (
      <Modal title={t("changePassword.title")} onExit={onTogglePasswordModal}>
        <ChangePasswordForm
          handleSubmit={handleSubmitPasswordForm}
          onCancel={onTogglePasswordModal}
        />
      </Modal>
    );
  };

  const renderApiTokenModal = () => {
    if (!showApiTokenModal) {
      return false;
    }

    // TODO - move to its own component
    return (
      <Modal
        title={t("apiToken.title")}
        onExit={onToggleApiTokenModal}
        onEnter={onToggleApiTokenModal}
      >
        <>
          <InfoBanner>
            <p>
              <strong>{t("account.apiTokenExpires")}</strong>{" "}
              {t("account.apiTokenInfo")}&nbsp;
              <CustomLink
                url="https://fleetdm.com/docs/using-fleet/fleetctl-cli?utm_medium=fleetui&utm_campaign=get-api-token#using-fleetctl-with-an-api-only-user"
                text={t("account.apiOnlyUserLink")}
                newTab
                variant="banner-link"
              />
              &nbsp;{t("account.apiTokenAlternative")}
            </p>
          </InfoBanner>
          <InputFieldHiddenContent
            value={authToken() || ""}
            helpText={
              <>
                {t("account.apiTokenSSOInfo")}{" "}
                <CustomLink
                  url="https://fleetdm.com/docs/deploying/configuration?utm_medium=fleetui&utm_campaign=get-api-token#session-duration"
                  text={t("account.sessionDurationLink")}
                  newTab
                />
              </>
            }
          />
          <div className="modal-cta-wrap">
            <Button onClick={onToggleApiTokenModal} type="button">
              {t("account.done")}
            </Button>
          </div>
        </>
      </Modal>
    );
  };

  if (!currentUser) {
    return null;
  }

  return (
    <SidePanelPage>
      <>
        <MainContent className={baseClass}>
          <>
            <div className={`${baseClass}__manage`}>
              <h1>{t("account.title")}</h1>
              <UserSettingsForm
                formData={currentUser}
                handleSubmit={handleSubmit}
                onCancel={onCancel}
                pendingEmail={pendingEmail}
                serverErrors={errors}
                smtpConfigured={config?.smtp_settings?.configured || false}
              />
            </div>
            {renderEmailModal()}
            {renderPasswordModal()}
            {renderApiTokenModal()}
          </>
        </MainContent>
        <SidePanelContent>
          <AccountSidePanel
            currentUser={currentUser}
            onChangePassword={onShowPasswordModal}
            onGetApiToken={onShowApiTokenModal}
          />
        </SidePanelContent>
      </>
    </SidePanelPage>
  );
};

export default AccountPage;
