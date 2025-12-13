import React from "react";
import { useTranslation } from "react-i18next";

import { ITeam } from "interfaces/team";
import { IUserFormErrors, UserRole } from "interfaces/user";
import Modal from "components/Modal";
import UserForm from "../UserForm";
import { IUserFormData } from "../UserForm/UserForm";

interface IAddUserModalProps {
  onCancel: () => void;
  onSubmit: (formData: IUserFormData) => void;
  defaultGlobalRole?: UserRole | null;
  defaultTeamRole?: UserRole;
  defaultTeams?: ITeam[];
  availableTeams?: ITeam[];
  isPremiumTier: boolean;
  smtpConfigured: boolean;
  sesConfigured: boolean;
  currentTeam?: ITeam;
  canUseSso: boolean; // corresponds to whether SSO is enabled for the organization
  isModifiedByGlobalAdmin?: boolean | false;
  isUpdatingUsers?: boolean | false;
  addUserErrors: IUserFormErrors;
}

const baseClass = "add-user-modal";

const AddUserModal = ({
  onCancel,
  onSubmit,
  currentTeam,
  defaultGlobalRole,
  defaultTeamRole,
  defaultTeams,
  availableTeams,
  isPremiumTier,
  smtpConfigured,
  sesConfigured,
  canUseSso,
  isModifiedByGlobalAdmin,
  isUpdatingUsers,
  addUserErrors,
}: IAddUserModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("settings:admin.users.modals.addUser.title")}
      onExit={onCancel}
      className={baseClass}
      width="large"
    >
      <UserForm
        ancestorErrors={addUserErrors}
        defaultGlobalRole={defaultGlobalRole}
        defaultTeamRole={defaultTeamRole}
        defaultTeams={defaultTeams}
        onCancel={onCancel}
        onSubmit={onSubmit}
        availableTeams={availableTeams || []}
        isPremiumTier={isPremiumTier}
        smtpConfigured={smtpConfigured}
        sesConfigured={sesConfigured}
        canUseSso={canUseSso}
        isModifiedByGlobalAdmin={isModifiedByGlobalAdmin}
        currentTeam={currentTeam}
        isNewUser
        isUpdatingUsers={isUpdatingUsers}
      />
    </Modal>
  );
};

export default AddUserModal;
