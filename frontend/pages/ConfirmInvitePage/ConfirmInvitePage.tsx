import React, { useCallback, useContext } from "react";
import { InjectedRouter } from "react-router";
import { Params } from "react-router/lib/Router";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";
import { ICreateUserWithInvitationFormData } from "interfaces/user";
import paths from "router/paths";
import usersAPI from "services/entities/users";
import inviteAPI, { IValidateInviteResp } from "services/entities/invites";

import AuthenticationFormWrapper from "components/AuthenticationFormWrapper";
import Spinner from "components/Spinner";
import { useQuery } from "react-query";
import { IInvite } from "interfaces/invite";
import ConfirmInviteForm from "components/forms/ConfirmInviteForm";
import { IConfirmInviteFormData } from "components/forms/ConfirmInviteForm/ConfirmInviteForm";
import { getErrorReason } from "interfaces/errors";
import { AxiosError } from "axios";
import { DEFAULT_USE_QUERY_OPTIONS } from "utilities/constants";

interface IConfirmInvitePageProps {
  router: InjectedRouter; // v3
  params: Params;
}

const baseClass = "confirm-invite-page";

const ConfirmInvitePage = ({ router, params }: IConfirmInvitePageProps) => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const { invite_token } = params;

  const {
    data: validInvite,
    error: validateInviteError,
    isLoading: isVerifyingInvite,
  } = useQuery<IValidateInviteResp, AxiosError, IInvite>(
    "invite",
    () => inviteAPI.verify(invite_token),
    {
      ...DEFAULT_USE_QUERY_OPTIONS,
      select: (resp: IValidateInviteResp) => resp.invite,
    }
  );

  const onSubmit = useCallback(
    async (formData: IConfirmInviteFormData) => {
      const dataForAPI: ICreateUserWithInvitationFormData = {
        email: validInvite?.email || "",
        invite_token,
        name: formData.name,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      try {
        await usersAPI.create(dataForAPI);
        router.push(paths.LOGIN);
        renderFlash("success", t("auth:invite.successMessage"));
      } catch (error) {
        const reason = getErrorReason(error);
        console.error(reason);
        renderFlash("error", reason);
      }
    },
    [invite_token, renderFlash, router, t, validInvite?.email]
  );

  if (currentUser) {
    router.push(paths.DASHBOARD);
    // return for router typechecking
    return <></>;
  }

  const renderContent = () => {
    if (isVerifyingInvite) {
      return <Spinner />;
    }

    // error is how API communicates an invalid invite
    if (validateInviteError) {
      return (
        <p className={`${baseClass}__description`}>
          {t("auth:invite.invalidTokenMessage")}
        </p>
      );
    }
    // valid - return form pre-filled with data from api response
    return (
      <>
        <p className={`${baseClass}__description`}>
          {t("auth:invite.description")}
        </p>
        <ConfirmInviteForm
          defaultFormData={{
            // at this point we will have a valid invite per error check above
            name: validInvite?.name,
          }}
          handleSubmit={onSubmit}
        />
      </>
    );
  };

  return (
    <AuthenticationFormWrapper
      header={
        validateInviteError
          ? t("auth:invite.invalidTokenTitle")
          : t("auth:invite.title")
      }
      className={baseClass}
    >
      {renderContent()}
    </AuthenticationFormWrapper>
  );
};

export default ConfirmInvitePage;
