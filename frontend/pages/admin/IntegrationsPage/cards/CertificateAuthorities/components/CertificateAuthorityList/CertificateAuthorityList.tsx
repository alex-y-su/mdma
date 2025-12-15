import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";

import UploadList from "pages/ManageControlsPage/components/UploadList";

import CertAuthorityListHeader from "../CertAuthorityListHeader";
import CertAuthorityListItem from "../CertAuthorityListItem";

const baseClass = "certificate-authority-list";

export type ICertAuthorityListData = ICertificateAuthorityPartial & {
  description: string;
};

/** This function extends the ICertificateAuthorityPartial with a description field
 * to provide a user-friendly description for each certificate authority.
 */
export const generateListData = (
  certAuthorities: ICertificateAuthorityPartial[],
  t: (key: string) => string
) => {
  return certAuthorities.map<ICertAuthorityListData>((cert) => {
    let description = "";
    switch (cert.type) {
      case "ndes_scep_proxy":
        description = t("certificateAuthorities.descriptions.ndes");
        break;
      case "digicert":
        description = t("certificateAuthorities.descriptions.digicert");
        break;
      case "custom_scep_proxy":
        description = t("certificateAuthorities.descriptions.customScep");
        break;
      case "hydrant":
        description = t("certificateAuthorities.descriptions.hydrant");
        break;
      case "smallstep":
        description = t("certificateAuthorities.descriptions.smallstep");
        break;
      case "custom_est_proxy":
        description = t("certificateAuthorities.descriptions.customEst");
        break;
      default:
        description = t("certificateAuthorities.descriptions.unknown");
    }

    return {
      ...cert,
      description,
    };
  });
};

interface ICertificateAuthorityListProps {
  certAuthorities: ICertificateAuthorityPartial[];
  onAddCertAuthority: () => void;
  onClickEdit: (cert: ICertificateAuthorityPartial) => void;
  onClickDelete: (cert: ICertificateAuthorityPartial) => void;
}

const CertificateAuthorityList = ({
  certAuthorities,
  onAddCertAuthority,
  onClickEdit,
  onClickDelete,
}: ICertificateAuthorityListProps) => {
  const { t } = useTranslation("settings");

  const listData = useMemo(() => generateListData(certAuthorities, t), [
    certAuthorities,
    t,
  ]);

  return (
    <UploadList<ICertAuthorityListData>
      className={baseClass}
      keyAttribute="name"
      listItems={listData}
      HeadingComponent={() => (
        <CertAuthorityListHeader onClickAddCertAuthority={onAddCertAuthority} />
      )}
      ListItemComponent={({ listItem }) => (
        <CertAuthorityListItem
          cert={listItem}
          onClickEdit={() => onClickEdit(listItem)}
          onClickDelete={() => onClickDelete(listItem)}
        />
      )}
    />
  );
};

export default CertificateAuthorityList;
