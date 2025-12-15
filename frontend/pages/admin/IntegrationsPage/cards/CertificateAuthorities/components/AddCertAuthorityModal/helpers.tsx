import React from "react";

import { IAddCertAuthorityBody } from "services/entities/certificates";
import { ICertificateAuthorityType } from "interfaces/certificates";
import { LEARN_MORE_ABOUT_BASE_LINK } from "utilities/constants";
import { IDropdownOption } from "interfaces/dropdownOption";
import { getErrorReason } from "interfaces/errors";

import CustomLink from "components/CustomLink";

import { IDigicertFormData } from "../DigicertForm/DigicertForm";
import { ICertFormData } from "../AddCertAuthorityModal/AddCertAuthorityModal";
import { INDESFormData } from "../NDESForm/NDESForm";
import { ICustomSCEPFormData } from "../CustomSCEPForm/CustomSCEPForm";
import { IHydrantFormData } from "../HydrantForm/HydrantForm";
import { ISmallstepFormData } from "../SmallstepForm/SmallstepForm";
import { ICustomESTFormData } from "../CustomESTForm/CustomESTForm";

/**
 * Generates the dropdown options for certificate authority types.
 * keep these alphabetized
 */
const generateDefaultCertAuthorityOptions = (
  t: (key: string) => string
): IDropdownOption[] => [
  {
    label: t("certificateAuthorities.types.customEst"),
    value: "custom_est_proxy",
  },
  {
    label: t("certificateAuthorities.types.customScep"),
    value: "custom_scep_proxy",
  },
  { label: t("certificateAuthorities.types.digicert"), value: "digicert" },
  {
    label: t("certificateAuthorities.types.hydrant"),
    value: "hydrant",
  },
  {
    label: t("certificateAuthorities.types.ndes"),
    value: "ndes_scep_proxy",
  },
  { label: t("certificateAuthorities.types.smallstep"), value: "smallstep" },
];

/**
 * conditionally generates the dropdown options disabling the ndes option
 * if one already exists
 */
export const generateDropdownOptions = (
  hasNDESCert: boolean,
  t: (key: string) => string
) => {
  const options = generateDefaultCertAuthorityOptions(t);

  if (!hasNDESCert) {
    return options;
  }

  // We only allow one NDES configuration, if ones exists disable the option and
  // add a tooltip.
  const ndesOption = options.find((option) => {
    return option.value === "ndes_scep_proxy";
  });
  if (ndesOption) {
    ndesOption.disabled = true;
    ndesOption.tooltipContent = t("certificateAuthorities.addModal.ndesLimit");
  }

  return options;
};

/**
 * Generates the data to be sent to the API to add a new certificate authority.
 * This function constructs the request body based on the selected certificate authority type
 * and the provided form data.
 */
// eslint-disable-next-line import/prefer-default-export
export const generateAddCertAuthorityData = (
  certAuthorityType: ICertificateAuthorityType,
  formData: ICertFormData
): IAddCertAuthorityBody | undefined => {
  switch (certAuthorityType) {
    case "ndes_scep_proxy": {
      const {
        scepURL,
        adminURL,
        username,
        password,
      } = formData as INDESFormData;
      return {
        ndes_scep_proxy: {
          url: scepURL,
          admin_url: adminURL,
          username,
          password,
        },
      };
    }
    case "digicert": {
      const {
        name,
        url: digicertUrl,
        apiToken,
        profileId,
        commonName,
        userPrincipalName,
        certificateSeatId,
      } = formData as IDigicertFormData;
      return {
        digicert: {
          name,
          url: digicertUrl,
          api_token: apiToken,
          profile_id: profileId,
          certificate_common_name: commonName,
          certificate_user_principal_names: [userPrincipalName],
          certificate_seat_id: certificateSeatId,
        },
      };
    }
    case "custom_scep_proxy": {
      const {
        name: customSCEPName,
        scepURL: customSCEPUrl,
        challenge,
      } = formData as ICustomSCEPFormData;
      return {
        custom_scep_proxy: {
          name: customSCEPName,
          url: customSCEPUrl,
          challenge,
        },
      };
    }
    case "hydrant": {
      const {
        name: hydrantName,
        url,
        clientId,
        clientSecret,
      } = formData as IHydrantFormData;
      return {
        hydrant: {
          name: hydrantName,
          url,
          client_id: clientId,
          client_secret: clientSecret,
        },
      };
    }
    case "smallstep": {
      const {
        name: smallstepName,
        scepURL: smallstepScepURL,
        challengeURL,
        username: smallstepUsername,
        password: smallstepPassword,
      } = formData as ISmallstepFormData;
      return {
        smallstep: {
          name: smallstepName,
          url: smallstepScepURL,
          challenge_url: challengeURL,
          username: smallstepUsername,
          password: smallstepPassword,
        },
      };
    }
    case "custom_est_proxy": {
      const {
        name: customESTName,
        url: customESTUrl,
        username: customESTUsername,
        password: customESTPassword,
      } = formData as ICustomESTFormData;
      return {
        custom_est_proxy: {
          name: customESTName,
          url: customESTUrl,
          username: customESTUsername,
          password: customESTPassword,
        },
      };
    }
    default:
      throw new Error(
        `Unknown certificate authority type: ${certAuthorityType}`
      );
  }
};

/**
 * Gets the error message we want to display from the api error message.
 * This is used in both add and edit certificate authority flows.
 */
export const getDisplayErrMessage = (
  err: unknown,
  t: (key: string) => string
): string | JSX.Element => {
  const reason = getErrorReason(err).toLowerCase();

  if (reason.includes("invalid api token")) {
    return t("certificateAuthorities.errors.invalidApiToken");
  } else if (reason.includes("invalid profile guid")) {
    return t("certificateAuthorities.errors.invalidProfileGuid");
  } else if (
    reason.includes("invalid url") ||
    reason.includes("no such host")
  ) {
    return t("certificateAuthorities.errors.invalidUrl");
  } else if (reason.includes("private key")) {
    return (
      <>
        {t("certificateAuthorities.errors.privateKeyNotConfigured")}{" "}
        <CustomLink
          text={t("certificateAuthorities.errors.learnMore")}
          url={`${LEARN_MORE_ABOUT_BASE_LINK}/fleet-server-private-key`}
          newTab
          variant="flash-message-link"
        />
      </>
    );
  } else if (reason.includes("invalid scep url")) {
    return t("certificateAuthorities.errors.invalidScepUrl");
  } else if (reason.includes("invalid admin url or credentials")) {
    return t("certificateAuthorities.errors.invalidAdminUrlOrCredentials");
  } else if (reason.includes("password cache is full")) {
    return t("certificateAuthorities.errors.ndesPasswordCacheFull");
  } else if (reason.includes("invalid challenge url")) {
    return t("certificateAuthorities.errors.invalidChallengeUrlOrCredentials");
  } else if (reason.includes("invalid challenge")) {
    return t("certificateAuthorities.errors.invalidChallenge");
  }

  return t("certificateAuthorities.errors.default");
};

export const getErrorMessage = (
  err: unknown,
  t: (key: string) => string
): JSX.Element => {
  return (
    <>
      {t("certificateAuthorities.addModal.errorPrefix")}{" "}
      {getDisplayErrMessage(err, t)}
    </>
  );
};
