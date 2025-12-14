import React, { useContext, useState } from "react";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import { AppContext } from "context/app";
import { NotificationContext } from "context/notification";

import { IQuery } from "interfaces/query";
import { ITargetsAPIResponse } from "interfaces/target";
import { IEditPackFormData } from "interfaces/pack";

import { getErrorReason } from "interfaces/errors";
import packsAPI from "services/entities/packs";

import NewPackForm from "components/forms/packs/NewPackForm";
// @ts-ignore
import PackInfoSidePanel from "components/side_panels/PackInfoSidePanel";
import SidePanelPage from "components/SidePanelPage";
import MainContent from "components/MainContent";
import SidePanelContent from "components/SidePanelContent";

interface IPackComposerPageProps {
  router: InjectedRouter;
}

const baseClass = "pack-composer";

const PackComposerPage = ({ router }: IPackComposerPageProps): JSX.Element => {
  const { isPremiumTier } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);
  const { t } = useTranslation("queries");

  const [selectedTargetsCount, setSelectedTargetsCount] = useState(0);
  const [isUpdatingPack, setIsUpdatingPack] = useState(false);

  const onFetchTargets = (
    query: IQuery,
    targetsResponse: ITargetsAPIResponse
  ) => {
    const { targets_count } = targetsResponse;
    setSelectedTargetsCount(targets_count);
    return false;
  };

  const handleSubmit = async (formData: IEditPackFormData) => {
    const { create } = packsAPI;

    setIsUpdatingPack(true);

    try {
      const {
        pack: { id: packID },
      } = await create(formData);
      router.push(PATHS.PACK(packID));
      renderFlash(
        "success",
        t("packs.create.success")
      );
    } catch (e) {
      if (
        getErrorReason(e, {
          reasonIncludes: "Duplicate entry",
        })
      ) {
        renderFlash(
          "error",
          t("packs.create.duplicateNameError")
        );
      } else {
        renderFlash("error", t("packs.create.error"));
      }
    } finally {
      setIsUpdatingPack(false);
    }
  };

  return (
    <SidePanelPage>
      <>
        <MainContent className={baseClass}>
          <NewPackForm
            className={`${baseClass}__pack-form`}
            handleSubmit={handleSubmit}
            onFetchTargets={onFetchTargets}
            selectedTargetsCount={selectedTargetsCount}
            isPremiumTier={isPremiumTier}
            isUpdatingPack={isUpdatingPack}
          />
        </MainContent>
        <SidePanelContent>
          <PackInfoSidePanel />
        </SidePanelContent>
      </>
    </SidePanelPage>
  );
};

export default PackComposerPage;
