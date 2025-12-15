import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";
import { dateAgo } from "utilities/date_format";
import { internationalTimeFormat } from "utilities/helpers";
import { DEFAULT_USE_QUERY_OPTIONS } from "utilities/constants";
import idpAPI from "services/entities/idp";

import SettingsSection from "pages/admin/components/SettingsSection";
import DataError from "components/DataError";
import Spinner from "components/Spinner";
import CustomLink from "components/CustomLink";
import TooltipWrapper from "components/TooltipWrapper";
import PremiumFeatureMessage from "components/PremiumFeatureMessage";

import SectionCard from "../../../MdmSettings/components/SectionCard";

const baseClass = "identity-provider-section";

const AddEndUserInfoCard = () => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      header={t("integrations.identity_provider.add_card_header")}
      cta={
        <CustomLink
          text={t("integrations.identity_provider.learn_how")}
          newTab
          url="https://fleetdm.com/learn-more-about/connect-idp"
          className={`${baseClass}__learn-more-link`}
        />
      }
    >
      <p className={`${baseClass}__section-card-content`}>
        {t("integrations.identity_provider.add_card_content")}
      </p>
    </SectionCard>
  );
};

interface IReceivedEndUserInfoCardProps {
  receivedAt: string;
}

const ReceivedEndUserInfoCard = ({
  receivedAt,
}: IReceivedEndUserInfoCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      iconName="success"
      cta={
        <CustomLink
          text={t("integrations.identity_provider.learn_more")}
          newTab
          url="https://fleetdm.com/learn-more-about/troubleshoot-idp-connection"
          className={`${baseClass}__learn-more-link`}
        />
      }
    >
      <p className={`${baseClass}__section-card-content`}>
        {t("integrations.identity_provider.received_info")}{" "}
        <TooltipWrapper
          showArrow
          position="top"
          tipContent={internationalTimeFormat(new Date(receivedAt))}
          underline={false}
          className={`${baseClass}__received-tooltip`}
        >
          ({dateAgo(receivedAt)})
        </TooltipWrapper>
        .
      </p>
    </SectionCard>
  );
};

interface IFailedEndUserInfoCardProps {
  receivedAt: string;
  details: string;
}

const FailedEndUserInfoCard = ({
  receivedAt,
  details,
}: IFailedEndUserInfoCardProps) => {
  const { t } = useTranslation("settings");

  return (
    <SectionCard
      iconName="error"
      cta={
        <CustomLink
          text={t("integrations.identity_provider.learn_more")}
          newTab
          url="https://fleetdm.com/learn-more-about/troubleshoot-idp-connection"
          className={`${baseClass}__learn-more-link`}
        />
      }
    >
      <p className={`${baseClass}__section-card-content`}>
        <TooltipWrapper
          showArrow
          position="top"
          tipContent={t("integrations.identity_provider.error_tooltip", { details })}
          underline={false}
          className={`${baseClass}__received-tooltip`}
        >
          {t("integrations.identity_provider.failed_to_receive", { timeAgo: dateAgo(receivedAt) })}
        </TooltipWrapper>
      </p>
    </SectionCard>
  );
};

const IdentityProviderSection = () => {
  const { t } = useTranslation("settings");
  const { isPremiumTier } = useContext(AppContext);

  const { data: scimIdPDetails, isLoading, isError } = useQuery(
    ["scim_details"],
    () => idpAPI.getSCIMDetails(),
    {
      ...DEFAULT_USE_QUERY_OPTIONS,
      enabled: isPremiumTier,
    }
  );
  const renderContent = () => {
    if (!isPremiumTier) {
      return <PremiumFeatureMessage />;
    }

    if (isError) {
      return <DataError />;
    }

    if (isLoading) {
      return <Spinner />;
    }

    if (!scimIdPDetails) return null;

    if (scimIdPDetails.last_request === null) {
      return <AddEndUserInfoCard />;
    } else if (scimIdPDetails.last_request.status === "success") {
      return (
        <ReceivedEndUserInfoCard
          receivedAt={scimIdPDetails.last_request.requested_at}
        />
      );
    } else if (scimIdPDetails.last_request.status === "error") {
      return (
        <FailedEndUserInfoCard
          receivedAt={scimIdPDetails.last_request.requested_at}
          details={scimIdPDetails.last_request.details}
        />
      );
    }

    return null;
  };
  return (
    <SettingsSection title={t("integrations.identity_provider.title")}>
      {renderContent()}
    </SettingsSection>
  );
};

export default IdentityProviderSection;
