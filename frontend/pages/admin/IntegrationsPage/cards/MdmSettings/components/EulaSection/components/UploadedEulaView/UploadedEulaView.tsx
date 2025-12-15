import React from "react";
import { useTranslation } from "react-i18next";

import { IEulaMetadataResponse } from "services/entities/mdm";

import CustomLink from "components/CustomLink";
import UploadList from "pages/ManageControlsPage/components/UploadList";
import EulaListItem from "../EulaListItem/EulaListItem";

const baseClass = "uploaded-eula-view";

interface IUploadedEulaViewProps {
  eulaMetadata: IEulaMetadataResponse;
  onDelete: () => void;
}

const UploadedEulaView = ({
  eulaMetadata,
  onDelete,
}: IUploadedEulaViewProps) => {
  const { t } = useTranslation("settings");

  return (
    <div className={baseClass}>
      <p>
        {t("integrations.eula.description")}{" "}
        <CustomLink
          url="https://fleetdm.com/learn-more-about/setup-experience/end-user-authentication"
          text={t("integrations.eula.learn_more")}
          newTab
        />
      </p>
      <UploadList
        keyAttribute="name"
        listItems={[eulaMetadata]}
        ListItemComponent={({ listItem }) => (
          <EulaListItem eulaData={listItem} onDelete={onDelete} />
        )}
      />
    </div>
  );
};

export default UploadedEulaView;
