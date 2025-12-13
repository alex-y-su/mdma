import React from "react";
import { useTranslation } from "react-i18next";

import { ITeam } from "interfaces/team";
import { IUserFormErrors, UserRole } from "interfaces/user";
import Modal from "components/Modal";
import UserForm from "../UserForm";
import { IUserFormData } from "../UserForm/UserForm";

interface IEditUserModalProps {
  onCancel: () => void;
  onSubmit: (formData: IUserFormData) => void;
  defaultName?: string;
  defaultEmail?: string;
  defaultGlobalRole?: UserRole | null;
  defaultTeamRole?: UserRole;
  defaultTeams?: ITeam[];
  availableTeams: ITeam[];
  currentTeam?: ITeam;
  isPremiumTier: boolean;
  smtpConfigured: boolean;
  sesConfigured: boolean;
  canUseSso: boolean; // corresponds to whether SSO is enabled for the organization
  isSsoEnabled?: boolean; // corresponds to whether SSO is enabled for the individual user
  isMfaEnabled?: boolean; // corresponds to whether MFA is enabled for the individual user
  isApiOnly?: boolean;
  editUserErrors: IUserFormErrors;
  isModifiedByGlobalAdmin?: boolean | false;
  isInvitePending?: boolean;
  isUpdatingUsers: boolean;
}

const baseClass = "edit-user-modal";

const EditUserModal = ({
  onCancel,
  onSubmit,
  defaultName,
  defaultEmail,
  defaultGlobalRole,
  defaultTeamRole,
  defaultTeams,
  availableTeams,
  isPremiumTier,
  smtpConfigured,
  sesConfigured,
  canUseSso,
  isSsoEnabled,
  isMfaEnabled,
  isApiOnly,
  currentTeam,
  editUserErrors,
  isModifiedByGlobalAdmin,
  isInvitePending,
  isUpdatingUsers,
}: IEditUserModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("settings:admin.users.modals.editUser.title")}
      onExit={onCancel}
      className={`${baseClass}__edit-user-modal`}
    >
      <UserForm
        ancestorErrors={editUserErrors}
        defaultName={defaultName}
        defaultEmail={defaultEmail}
        defaultGlobalRole={defaultGlobalRole}
        defaultTeamRole={defaultTeamRole}
        defaultTeams={defaultTeams}
        onCancel={onCancel}
        onSubmit={onSubmit}
        availableTeams={availableTeams}
        isPremiumTier={isPremiumTier}
        smtpConfigured={smtpConfigured}
        sesConfigured={sesConfigured}
        canUseSso={canUseSso}
        isSsoEnabled={isSsoEnabled}
        isMfaEnabled={isMfaEnabled}
        isApiOnly={isApiOnly}
        isModifiedByGlobalAdmin={isModifiedByGlobalAdmin}
        isInvitePending={isInvitePending}
        currentTeam={currentTeam}
        isUpdatingUsers={isUpdatingUsers}
      />
    </Modal>
  );
};

export default EditUserModal;
