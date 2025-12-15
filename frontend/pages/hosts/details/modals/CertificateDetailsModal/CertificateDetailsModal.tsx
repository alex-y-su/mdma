import React from "react";
import { useTranslation } from "react-i18next";

import { IHostCertificate } from "interfaces/certificates";

import Modal from "components/Modal";
import DataSet from "components/DataSet";
import Button from "components/buttons/Button";
import TooltipTruncatedText from "components/TooltipTruncatedText";
import { monthDayYearFormat } from "utilities/date_format";

const baseClass = "certificate-details-modal";

interface ICertificateDetailsModalProps {
  certificate: IHostCertificate;
  onExit: () => void;
}

const CertificateDetailsModal = ({
  certificate,
  onExit,
}: ICertificateDetailsModalProps) => {
  const { t } = useTranslation("hosts");

  // Destructure the certificate object so we can check for presence of values
  const {
    subject: {
      country: subjectCountry,
      organization: subjectOrganization,
      organizational_unit: subjectOrganizationalUnit,
      common_name: subjectCommonName,
    },
    issuer: {
      country: issuerCountry,
      organization: issuerOrganization,
      organizational_unit: issuerOrganizationalUnit,
      common_name: issuerCommonName,
    },
    not_valid_before,
    not_valid_after,
    key_algorithm,
    key_strength,
    key_usage,
    serial,
    certificate_authority,
    signing_algorithm,
  } = certificate;

  let serialDecimal = "";
  try {
    if (serial) {
      // Convert the serial number to decimal and display it if it is less than 2^63 to
      // match keychain and openSSL display behavior
      const serialParsed = BigInt(`0x${serial}`);
      if (serialParsed < BigInt("0x8000000000000000")) {
        serialDecimal = serialParsed.toString(10);
      }
    }
  } catch (e) {
    // The serial couldn't be converted to decimal but this is best effort so not a big deal
    // since we will still show the original representation, whatever it was
  }

  const showSubjectSection = Boolean(
    subjectCountry ||
      subjectOrganization ||
      subjectOrganizationalUnit ||
      subjectCommonName
  );
  const showIssuerNameSection = Boolean(
    issuerCommonName ||
      issuerCountry ||
      issuerOrganization ||
      issuerOrganizationalUnit
  );
  const showValidityPeriodSection = Boolean(
    not_valid_before || not_valid_after
  );
  const showKeyInfoSection = Boolean(
    key_algorithm || key_strength || key_usage || serial
  );
  const showSignatureSection = Boolean(signing_algorithm);

  return (
    <Modal className={baseClass} title={t("certificates.modal.title")} onExit={onExit}>
      <>
        <div className={`${baseClass}__content`}>
          {showSubjectSection && (
            <div className={`${baseClass}__section`}>
              <h3>{t("certificates.modal.subjectName")}</h3>
              <dl>
                {subjectCountry && (
                  <DataSet
                    title={t("certificates.modal.countryOrRegion")}
                    value={<TooltipTruncatedText value={subjectCountry} />}
                    orientation="horizontal"
                  />
                )}
                {subjectOrganization && (
                  <DataSet
                    title={t("certificates.modal.organization")}
                    value={<TooltipTruncatedText value={subjectOrganization} />}
                    orientation="horizontal"
                  />
                )}
                {subjectOrganizationalUnit && (
                  <DataSet
                    title={t("certificates.modal.organizationalUnit")}
                    value={
                      <TooltipTruncatedText value={subjectOrganizationalUnit} />
                    }
                    orientation="horizontal"
                  />
                )}
                {subjectCommonName && (
                  <DataSet
                    title={t("certificates.modal.commonName")}
                    value={<TooltipTruncatedText value={subjectCommonName} />}
                    orientation="horizontal"
                  />
                )}
              </dl>
            </div>
          )}
          {showIssuerNameSection && (
            <div className={`${baseClass}__section`}>
              <h3>{t("certificates.modal.issuerName")}</h3>
              <dl>
                {issuerCountry && (
                  <DataSet
                    title={t("certificates.modal.countryOrRegion")}
                    value={<TooltipTruncatedText value={issuerCountry} />}
                    orientation="horizontal"
                  />
                )}
                {issuerOrganization && (
                  <DataSet
                    title={t("certificates.modal.organization")}
                    value={<TooltipTruncatedText value={issuerOrganization} />}
                    orientation="horizontal"
                  />
                )}
                {issuerOrganizationalUnit && (
                  <DataSet
                    title={t("certificates.modal.organizationalUnit")}
                    value={
                      <TooltipTruncatedText value={issuerOrganizationalUnit} />
                    }
                    orientation="horizontal"
                  />
                )}
                {issuerCommonName && (
                  <DataSet
                    title={t("certificates.modal.commonName")}
                    value={<TooltipTruncatedText value={issuerCommonName} />}
                    orientation="horizontal"
                  />
                )}
              </dl>
            </div>
          )}
          {showValidityPeriodSection && (
            <div className={`${baseClass}__section`}>
              <h3>{t("certificates.modal.validityPeriod")}</h3>
              <dl>
                {not_valid_before && (
                  <DataSet
                    title={t("certificates.modal.notValidBefore")}
                    value={
                      <TooltipTruncatedText
                        value={monthDayYearFormat(not_valid_before)}
                      />
                    }
                    orientation="horizontal"
                  />
                )}
                {not_valid_after && (
                  <DataSet
                    title={t("certificates.modal.notValidAfter")}
                    value={
                      <TooltipTruncatedText
                        value={monthDayYearFormat(not_valid_after)}
                      />
                    }
                    orientation="horizontal"
                  />
                )}
              </dl>
            </div>
          )}
          {showKeyInfoSection && (
            <div className={`${baseClass}__section`}>
              <h3>{t("certificates.modal.keyInfo")}</h3>
              <dl>
                {key_algorithm && (
                  <DataSet
                    title={t("certificates.modal.algorithm")}
                    value={<TooltipTruncatedText value={key_algorithm} />}
                    orientation="horizontal"
                  />
                )}
                {!!key_strength && (
                  <DataSet
                    title={t("certificates.modal.keySize")}
                    value={<TooltipTruncatedText value={key_strength} />}
                    orientation="horizontal"
                  />
                )}
                {key_usage && (
                  <DataSet
                    title={t("certificates.modal.keyUsage")}
                    value={<TooltipTruncatedText value={key_usage} />}
                    orientation="horizontal"
                  />
                )}
                {serial && (
                  <DataSet
                    title={t("certificates.modal.serialNumberHex")}
                    value={<TooltipTruncatedText value={serial} />}
                    orientation="horizontal"
                  />
                )}
                {serialDecimal && (
                  <DataSet
                    title={t("certificates.modal.serialNumberDecimal")}
                    value={<TooltipTruncatedText value={serialDecimal} />}
                    orientation="horizontal"
                  />
                )}
              </dl>
            </div>
          )}
          {/* will always show this section */}
          <div className={`${baseClass}__section`}>
            <h3>{t("certificates.modal.basicConstraints")}</h3>
            <dl>
              <DataSet
                title={t("certificates.modal.certificateAuthority")}
                value={
                  <TooltipTruncatedText
                    value={certificate_authority ? t("certificates.modal.yes") : t("certificates.modal.no")}
                  />
                }
                orientation="horizontal"
              />
            </dl>
          </div>
          {showSignatureSection && (
            <div className={`${baseClass}__section`}>
              <h3>{t("certificates.modal.signature")}</h3>
              <dl>
                <DataSet
                  title={t("certificates.modal.algorithm")}
                  value={<TooltipTruncatedText value={signing_algorithm} />}
                  orientation="horizontal"
                />
              </dl>
            </div>
          )}
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onExit}>{t("certificates.modal.done")}</Button>
        </div>
      </>
    </Modal>
  );
};

export default CertificateDetailsModal;
