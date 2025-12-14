import React, { MouseEventHandler } from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";

interface IBreadcrumbs {
  onSetPage: (page: number) => void;
  currentPage: number;
  pageProgress: number;
}
const baseClass = "registration-breadcrumbs";

const Breadcrumbs = ({
  onSetPage,
  currentPage = 1,
  pageProgress = 1,
}: IBreadcrumbs): JSX.Element => {
  const { t } = useTranslation("auth");
  const pageBaseClass = `${baseClass}__page`;
  const page1ClassName = classnames(pageBaseClass, `${pageBaseClass}--1`, {
    [`${pageBaseClass}--active`]: currentPage === 1,
    [`${pageBaseClass}--complete`]: pageProgress > 1,
  });

  const page2TabIndex = pageProgress >= 2 ? 0 : -1;
  const page2ClassName = classnames(pageBaseClass, `${pageBaseClass}--2`, {
    [`${pageBaseClass}--active`]: currentPage === 2,
    [`${pageBaseClass}--complete`]: pageProgress > 2,
  });
  const page3TabIndex = pageProgress >= 3 ? 0 : -1;
  const page3ClassName = classnames(pageBaseClass, `${pageBaseClass}--3`, {
    [`${pageBaseClass}--active`]: currentPage === 3,
    [`${pageBaseClass}--complete`]: pageProgress > 3,
  });

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__wrapper`}>
        <Button
          className={page1ClassName}
          onClick={() => onSetPage(1)}
          variant="unstyled"
        >
          {t("registration.breadcrumbs.step1")}
        </Button>
        <Button
          className={page2ClassName}
          onClick={() => onSetPage(2)}
          tabIndex={page2TabIndex}
          variant="unstyled"
        >
          {t("registration.breadcrumbs.step2")}
        </Button>
        <Button
          className={page3ClassName}
          onClick={() => onSetPage(3)}
          tabIndex={page3TabIndex}
          variant="unstyled"
        >
          {t("registration.breadcrumbs.step3")}
        </Button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
