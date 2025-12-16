import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { noop } from "lodash";

import { DEFAULT_EMPTY_CELL_VALUE } from "utilities/constants";
import { NotificationContext } from "context/notification";
import { IHostMdmProfile } from "interfaces/mdm";

import TooltipTruncatedTextCell from "components/TableContainer/DataTable/TooltipTruncatedTextCell";
import Button from "components/buttons/Button";
import Icon from "components/Icon";
import CustomLink from "components/CustomLink";

import { IHostMdmProfileWithAddedStatus } from "../OSSettingsTableConfig";

const baseClass = "os-settings-error-cell";

interface IRefetchButtonProps {
  isFetching: boolean;
  onClick: (evt: React.MouseEvent<HTMLButtonElement, React.MouseEvent>) => void;
}

const RefetchButton = ({ isFetching, onClick }: IRefetchButtonProps) => {
  const { t } = useTranslation("hosts");
  const classNames = classnames(`${baseClass}__resend-button`, "resend-link", {
    [`${baseClass}__resending`]: isFetching,
  });

  const buttonText = isFetching
    ? t("osSettingsModal.errorCell.resending")
    : t("osSettingsModal.errorCell.resend");

  // add additonal props when we need to display a tooltip for the button

  return (
    <Button
      disabled={isFetching}
      onClick={onClick}
      variant="inverse"
      className={classNames}
      size="small"
    >
      <Icon name="refresh" color="ui-fleet-black-75" size="small" />
      {buttonText}
    </Button>
  );
};

const formatAndroidProfileNotAppliedError = (
  detail: IHostMdmProfile["detail"],
  t: (key: string) => string
) => {
  if (
    detail.includes("settings couldn't apply to a host") ||
    detail.includes("Other settings are applied")
  ) {
    return (
      <>
        {detail}{" "}
        <CustomLink
          text={t("osSettingsModal.errorCell.learnMore")}
          url="https://fleetdm.com/learn-more-about/android-profile-errors"
          newTab
          variant="tooltip-link"
        />
      </>
    );
  }
  return null;
};

/**
 * formatDetailCertificateError generates the formatted detail for certain errors related to
 * certificate profiles. It return a JSX element with the formatted message or null if
 * the detail does not match any of the expected patterns.
 */
const formatDetailCertificateError = (
  detail: IHostMdmProfile["detail"],
  t: (key: string) => string
) => {
  const formattedCertificatesPath = (
    <b>
      {t("osSettingsModal.errorCell.settings")} {">"}{" "}
      {t("osSettingsModal.errorCell.integrations")} {">"}{" "}
      {t("osSettingsModal.errorCell.certificates")}
    </b>
  );

  const matchTokenErr = detail.match(
    /get certificate from (?:DigiCert|Digicert|digicert).*token configured in (?<ca>.*) certificate authority is invalid/
  );
  if (matchTokenErr?.groups) {
    return (
      <>
        {t("osSettingsModal.errorCell.couldntGetCert")}{" "}
        <b>{t("osSettingsModal.errorCell.apiToken")}</b>{" "}
        {t("osSettingsModal.errorCell.configuredIn")}{" "}
        <b>{matchTokenErr.groups.ca}</b>{" "}
        {t("osSettingsModal.errorCell.certAuthorityInvalid")}{" "}
        {t("osSettingsModal.errorCell.pleaseGoTo")} {formattedCertificatesPath},{" "}
        {t("osSettingsModal.errorCell.correctAndResend")}.
      </>
    );
  }

  const matchProfileIdErr = detail.match(
    /get certificate from (?:DigiCert|Digicert|digicert) for (?<ca>.*)\..*POST request: 410.*Profile with id.*was deleted/
  );
  const matchDeletedProfileErr = detail.match(
    /get certificate from (?:DigiCert|Digicert|digicert) for (?<ca>.*)\..*POST request: 400.*deleted or suspended Profile/
  );
  if (matchProfileIdErr?.groups || matchDeletedProfileErr?.groups) {
    return (
      <>
        {t("osSettingsModal.errorCell.couldntGetCert")}{" "}
        <b>{t("osSettingsModal.errorCell.profileGuid")}</b>{" "}
        {t("osSettingsModal.errorCell.configuredIn")}{" "}
        <b>
          {matchProfileIdErr?.groups?.ca || matchDeletedProfileErr?.groups?.ca}
        </b>{" "}
        {t("osSettingsModal.errorCell.certAuthorityDoesntExist")}{" "}
        {t("osSettingsModal.errorCell.pleaseGoTo")} {formattedCertificatesPath},{" "}
        {t("osSettingsModal.errorCell.correctAndResend")}.
      </>
    );
  }

  const matchFleetVarErr = detail.match(
    /populate (?<field>.*) because (?<ca>.*) certificate authority does(?:n.t| not) exist/
  );
  if (matchFleetVarErr?.groups) {
    return (
      <>
        {t("osSettingsModal.errorCell.fleetCouldntPopulate")}{" "}
        {matchFleetVarErr.groups.field} {t("osSettingsModal.errorCell.because")}{" "}
        <b>{matchFleetVarErr.groups.ca}</b>{" "}
        {t("osSettingsModal.errorCell.certAuthorityDoesntExist")}{" "}
        {t("osSettingsModal.errorCell.pleaseGoTo")}{" "}
        <b>
          {t("osSettingsModal.errorCell.settings")} {">"}{" "}
          {t("osSettingsModal.errorCell.integrations")} {">"}{" "}
          {t("osSettingsModal.errorCell.certificates")}
        </b>
        , {t("osSettingsModal.errorCell.addAndResendProfile")}.
      </>
    );
  }

  return null;
};

/**
 * formatDetailIdpEmailError generates the formatted detail for certain errors related to
 * host IdP email profiles. It returns a JSX element with the formatted message or null if
 * the detail does not match any of the expected patterns.
 */
const formatDetailIdpEmailError = (
  detail: IHostMdmProfile["detail"],
  t: (key: string) => string
) => {
  if (detail.includes("There is no IdP email for this host.")) {
    return (
      <>
        {t("osSettingsModal.errorCell.noIdpEmail")}
        <br />
        {t("osSettingsModal.errorCell.fleetCouldntPopulateVar")}
        <br />
        $FLEET_VAR_HOST_END_USER_EMAIL_IDP.
        <br />
        <CustomLink
          text={t("osSettingsModal.errorCell.learnMore")}
          url="https://fleetdm.com/learn-more-about/idp-email"
          newTab
          variant="tooltip-link"
        />
      </>
    );
  }
  return null;
};

/**
 * generates the formatted tooltip for the error column.
 * the expected format of the error string is:
 * "key1: value1, key2: value2, key3: value3"
 */
const formatDetailWindowsProfile = (detail: string) => {
  const keyValuePairs = detail.split(/, */);
  const formattedElements: JSX.Element[] = [];

  // Special case to handle bitlocker error message. It does not follow the
  // expected string format so we will just render the error message as is.
  if (
    detail.includes("BitLocker") ||
    detail.includes("preparing volume for encryption")
  ) {
    return detail;
  }

  keyValuePairs.forEach((pair, i) => {
    const [key, value] = pair.split(/:(.*)/).map((str) => str.trim());
    if (key && value) {
      formattedElements.push(
        <span key={key}>
          <b>{key}:</b> {value}
          {/* dont add the trailing comma for the last element */}
          {i !== keyValuePairs.length - 1 && (
            <>
              ,<br />
            </>
          )}
        </span>
      );
    }
  });

  return formattedElements.length ? <>{formattedElements}</> : detail;
};

/**
 * generates the error tooltip for the error column. This will be formatted or
 * unformatted.
 */
const generateErrorTooltip = (
  cellValue: string,
  profile: IHostMdmProfileWithAddedStatus,
  t: (key: string) => string
) => {
  if (profile.status !== "failed") return null;

  // Special case to handle IdP email errors
  const idpEmailError = formatDetailIdpEmailError(profile.detail, t);
  if (idpEmailError) {
    return idpEmailError;
  }

  // Special case to handle certificate profile errors
  const certificateError = formatDetailCertificateError(profile.detail, t);
  if (certificateError) {
    return certificateError;
  }

  const androidProfileNotAppliedError = formatAndroidProfileNotAppliedError(
    profile.detail,
    t
  );
  if (androidProfileNotAppliedError) {
    return androidProfileNotAppliedError;
  }

  if (profile.platform === "windows") {
    return formatDetailWindowsProfile(profile.detail);
  }

  return cellValue;
};

interface IOSSettingsErrorCellProps {
  canResendProfiles: boolean;
  profile: IHostMdmProfileWithAddedStatus;
  resendRequest: (profileUUID: string) => Promise<void>;
  onProfileResent?: () => void;
}

const OSSettingsErrorCell = ({
  canResendProfiles,
  profile,
  resendRequest,
  onProfileResent = noop,
}: IOSSettingsErrorCellProps) => {
  const { t } = useTranslation("hosts");
  const { renderFlash } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);

  const onResendProfile = async () => {
    setIsLoading(true);
    try {
      await resendRequest(profile.profile_uuid);
      onProfileResent();
    } catch (e) {
      renderFlash("error", t("osSettingsModal.errorCell.couldntResend"));
    }
    setIsLoading(false);
  };

  const isFailed = profile.status === "failed";
  const isVerified = profile.status === "verified";
  const showRefetchButton = canResendProfiles && (isFailed || isVerified);
  const value = (isFailed && profile.detail) || DEFAULT_EMPTY_CELL_VALUE;

  const tooltip = generateErrorTooltip(value, profile, t);

  return (
    <div className={baseClass}>
      <TooltipTruncatedTextCell
        tooltipBreakOnWord
        tooltip={tooltip}
        value={value}
        // we dont want the default "w250" class so we pass in empty string
        classes=""
        className={
          isFailed || showRefetchButton
            ? `${baseClass}__failed-message`
            : undefined
        }
      />
      {showRefetchButton && (
        <RefetchButton isFetching={isLoading} onClick={onResendProfile} />
      )}
    </div>
  );
};

export default OSSettingsErrorCell;
