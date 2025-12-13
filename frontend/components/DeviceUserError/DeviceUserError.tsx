import React from "react";
import { useTranslation } from "react-i18next";

import Icon from "components/Icon/Icon";
import classNames from "classnames";

const baseClass = "device-user-error";

interface IDeviceUserErrorProps {
  /** Modifies styling for mobile width (<768px) */
  isMobileView?: boolean;
  /** Modifies error message for iPhone/iPad/Android */
  isMobileDevice?: boolean;
  isAuthenticationError?: boolean;
  platform?: string;
}

const DeviceUserError = ({
  isMobileView = false,
  isMobileDevice = false,
  isAuthenticationError = false,
}: IDeviceUserErrorProps): JSX.Element => {
  const { t } = useTranslation();
  const wrapperClassnames = classNames(baseClass, {
    [`${baseClass}__mobile-view`]: isMobileView,
  });

  // Default: "Something went wrong"
  let headerContent: React.ReactNode = (
    <>
      <Icon name="error" /> {t("common:errors.somethingWentWrong")}
    </>
  );
  let bodyContent: React.ReactNode = <>{t("common:errors.contactItAdmin")}</>;

  if (isAuthenticationError) {
    headerContent = (
      <>
        <Icon name="error" />
        {isMobileDevice
          ? t("common:errors.invalidCertificate")
          : t("common:errors.invalidUrl")}
      </>
    );
    bodyContent = isMobileDevice ? (
      t("common:errors.invalidCertificateMessage")
    ) : (
      <>{t("common:errors.invalidUrlMessage")}</>
    );
  }

  return (
    <div className={wrapperClassnames}>
      <div className={`${baseClass}__inner`}>
        <div className="info">
          <span className="info__header">{headerContent}</span>
          <span className="info__data">{bodyContent}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceUserError;
