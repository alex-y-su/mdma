import React from "react";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import formFieldInterface from "interfaces/form_field";
import InputField from "components/forms/fields/InputField";
import validate from "components/forms/UserSettingsForm/validate";

const formFields = ["email", "name", "position", "username"];

const baseClass = "manage-user";

const UserSettingsForm = ({
  fields,
  handleSubmit,
  pendingEmail,
  onCancel,
  smtpConfigured,
}) => {
  const { t } = useTranslation();

  const renderEmailHelpText = () => {
    if (!pendingEmail) {
      return undefined;
    }

    return (
      <i className={`${baseClass}__email-help-text`}>
        <Trans
          i18nKey="settings:account.changeEmail.pendingChange"
          values={{ email: pendingEmail }}
          components={{ bold: <b /> }}
          defaults="Pending change to <bold>{{email}}</bold>"
        />
      </i>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={baseClass} autoComplete="off">
      <div
        className="smtp-not-configured"
        data-tip
        data-for="smtp-tooltip"
        data-tip-disable={smtpConfigured}
      >
        <InputField
          {...fields.email}
          autofocus
          label={t("settings:account.userSettings.emailLabel")}
          helpText={renderEmailHelpText()}
          readOnly={!smtpConfigured}
          tooltip={
            <>
              {t("settings:account.userSettings.smtpRequired")
                .split("**")
                .map((part, idx) =>
                  idx % 2 === 1 ? <strong key={part}>{part}</strong> : part
                )}
            </>
          }
        />
      </div>
      <InputField
        {...fields.name}
        label={t("settings:account.userSettings.nameLabel")}
        inputOptions={{
          maxLength: "80",
        }}
      />
      <InputField
        {...fields.position}
        label={t("settings:account.userSettings.positionLabel")}
      />
      <div className="button-wrap">
        <Button onClick={onCancel} variant="inverse">
          {t("common:buttons.cancel")}
        </Button>
        <Button type="submit">{t("common:buttons.update")}</Button>
      </div>
    </form>
  );
};

UserSettingsForm.propTypes = {
  fields: PropTypes.shape({
    email: formFieldInterface.isRequired,
    name: formFieldInterface.isRequired,
    position: formFieldInterface.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pendingEmail: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  smtpConfigured: PropTypes.bool,
};

export default Form(UserSettingsForm, { fields: formFields, validate });
