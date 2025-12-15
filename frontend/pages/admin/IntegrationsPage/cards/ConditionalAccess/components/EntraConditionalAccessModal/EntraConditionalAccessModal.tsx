import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { size } from "lodash";

import { NotificationContext } from "context/notification";
import conditionalAccessAPI from "services/entities/conditional_access";

// @ts-ignore
import InputField from "components/forms/fields/InputField";
import CustomLink from "components/CustomLink";
import Modal from "components/Modal";
import Button from "components/buttons/Button";
import { IInputFieldParseTarget } from "interfaces/form_field";
import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";

const baseClass = "entra-conditional-access-modal";

const MSETID = "microsoft_entra_tenant_id";

interface IFormData {
  [MSETID]: string;
}

interface IFormErrors {
  [MSETID]?: string | null;
}

const validate = (formData: IFormData, t: any) => {
  const errs: IFormErrors = {};
  if (!formData[MSETID]) {
    errs[MSETID] = t("integrations.conditionalAccess.entra.validation.tenantIdRequired");
  }
  return errs;
};

export interface IEntraConditionalAccessModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const EntraConditionalAccessModal = ({
  onCancel,
  onSuccess,
}: IEntraConditionalAccessModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    [MSETID]: "",
  });
  const [formErrors, setFormErrors] = useState<IFormErrors>({});

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const errs = validate(formData, t);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setIsUpdating(true);
    try {
      const {
        microsoft_authentication_url: msAuthURL,
      } = await conditionalAccessAPI.triggerMicrosoftConditionalAccess(
        formData[MSETID]
      );
      window.open(msAuthURL);
      setIsUpdating(false);
      // Close modal and show banner on main page
      onSuccess();
    } catch (e) {
      renderFlash(
        "error",
        t("integrations.conditionalAccess.entra.updateError")
      );
      setIsUpdating(false);
    }
  };

  const onInputChange = ({ name, value }: IInputFieldParseTarget) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({}); // Clear any existing error
  };

  const onInputBlur = () => {
    setFormErrors(validate(formData, t));
  };

  return (
    <Modal
      title={t("integrations.conditionalAccess.entra.title")}
      onExit={onCancel}
      className={baseClass}
      width="large"
    >
      <>
        <form onSubmit={onSubmit} autoComplete="off">
          <p className={`${baseClass}__instructions`}>
            {t("integrations.conditionalAccess.entra.instructions")}{" "}
            <CustomLink
              url={`${LEARN_MORE_ABOUT_BASE_LINK}/entra-conditional-access`}
              text={t("integrations.conditionalAccess.entra.guide")}
              newTab
            />
          </p>
          <InputField
            label={t("integrations.conditionalAccess.entra.tenantId")}
            helpText={t("integrations.conditionalAccess.entra.tenantIdHelp")}
            onChange={onInputChange}
            name={MSETID}
            value={formData[MSETID]}
            parseTarget
            onBlur={onInputBlur}
            error={formErrors[MSETID]}
          />
          <div className="modal-cta-wrap">
            <Button
              type="submit"
              disabled={!!size(formErrors)}
              isLoading={isUpdating}
            >
              {t("integrations.conditionalAccess.entra.save")}
            </Button>
            <Button onClick={onCancel} variant="inverse">
              {t("integrations.conditionalAccess.entra.cancel")}
            </Button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default EntraConditionalAccessModal;
