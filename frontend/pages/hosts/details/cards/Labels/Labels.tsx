import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import { ILabel } from "interfaces/label";
import classnames from "classnames";

import Card from "components/Card";
import CardHeader from "components/CardHeader";
import { LABEL_DISPLAY_MAP } from "utilities/constants";
import TooltipTruncatedText from "components/TooltipTruncatedText";

const baseClass = "host-labels-card";

interface ILabelsProps {
  onLabelClick: (label: ILabel) => void;
  labels: ILabel[];
  className?: string;
}

const Labels = ({
  onLabelClick,
  labels,
  className,
}: ILabelsProps): JSX.Element => {
  const { t } = useTranslation();
  const classNames = classnames(baseClass, className);

  const labelItems = labels.map((label: ILabel) => {
    return (
      <li className="list__item" key={label.id}>
        <Button
          onClick={() => onLabelClick(label)}
          variant="pill"
          className="list__button"
        >
          <TooltipTruncatedText
            value={
              label.label_type === "builtin" && label.name in LABEL_DISPLAY_MAP
                ? LABEL_DISPLAY_MAP[
                    label.name as keyof typeof LABEL_DISPLAY_MAP
                  ]
                : label.name
            }
          />
        </Button>
      </li>
    );
  });

  return (
    <Card
      borderRadiusSize="xxlarge"
      paddingSize="xlarge"
      className={classNames}
    >
      <CardHeader header={t("labels:hostDetails.title")} />
      {labels.length === 0 ? (
        <p className="info-flex__item">{t("labels:hostDetails.noLabels")}</p>
      ) : (
        <ul className="list">{labelItems}</ul>
      )}
    </Card>
  );
};

export default Labels;
