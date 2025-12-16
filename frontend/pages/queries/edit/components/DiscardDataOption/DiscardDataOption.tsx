import Checkbox from "components/forms/fields/Checkbox";
import Icon from "components/Icon";
import InfoBanner from "components/InfoBanner";
import TooltipWrapper from "components/TooltipWrapper";
import { QueryLoggingOption } from "interfaces/schedulable_query";
import React, { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const baseClass = "discard-data-option";

interface IDiscardDataOptionProps {
  queryReportsDisabled: boolean;
  selectedLoggingType: QueryLoggingOption;
  discardData: boolean;
  setDiscardData: (value: boolean) => void;
}

const DiscardDataOption = ({
  queryReportsDisabled,
  selectedLoggingType,
  discardData,
  setDiscardData,
}: IDiscardDataOptionProps) => {
  const { t } = useTranslation("queries");
  const [forceEditDiscardData, setForceEditDiscardData] = useState(false);
  const disable = queryReportsDisabled && !forceEditDiscardData;

  const renderHelpText = () => (
    <div className="help-text">
      {disable ? (
        <>
          {t("discardData.globallyDisabledText")}{" "}
          <TooltipWrapper tipContent={t("discardData.globallyDisabledTooltip")}>
            {t("discardData.globallyDisabledLink")}
          </TooltipWrapper>{" "}
          <Link
            to=""
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setForceEditDiscardData(true);
            }}
            className={`${baseClass}__edit-anyway`}
          >
            <>
              {t("discardData.editAnyway")}
              <Icon
                name="chevron-right"
                color="ui-fleet-black-75"
                size="small"
              />
            </>
          </Link>
        </>
      ) : (
        t("discardData.helpText")
      )}
    </div>
  );
  return (
    <div className={baseClass}>
      {["differential", "differential_ignore_removals"].includes(
        selectedLoggingType
      ) && (
        <>
          <InfoBanner color="purple">
            {t("discardData.differentialBanner")}
          </InfoBanner>
        </>
      )}
      <Checkbox
        name="discardData"
        onChange={setDiscardData}
        value={discardData}
        wrapperClassName={
          disable ? `${baseClass}__disabled-discard-data-checkbox` : ""
        }
        helpText={renderHelpText()}
      >
        {t("discardData.label")}
      </Checkbox>
    </div>
  );
};

export default DiscardDataOption;
