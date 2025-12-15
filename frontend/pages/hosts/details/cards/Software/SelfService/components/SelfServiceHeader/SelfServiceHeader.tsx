import React from "react";
import { useTranslation } from "react-i18next";
import CardHeader from "components/CardHeader";
import CustomLink from "components/CustomLink";

const SelfServiceHeader = ({
  contactUrl,
  variant,
}: {
  contactUrl: string;
  variant?: "mobile-header";
}) => {
  const { t } = useTranslation("hosts");

  return (
    <CardHeader
      header={t("selfService.title")}
      subheader={
        <>
          {t("selfService.description")}{" "}
          {contactUrl && (
            <span>
              {t("selfService.needHelp")}{" "}
              <CustomLink url={contactUrl} text={t("selfService.reachOutToIT")} newTab />
            </span>
          )}
        </>
      }
      variant={variant}
    />
  );
};

export default SelfServiceHeader;
