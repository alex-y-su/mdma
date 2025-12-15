import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useDeepEffect from "hooks/useDeepEffect";

import Button from "components/buttons/Button";

import { IQuery } from "interfaces/query";
import { IScheduledQuery } from "interfaces/scheduled_query";
import { ITarget, ITargetsAPIResponse } from "interfaces/target";
// @ts-ignore
import InputField from "components/forms/fields/InputField";
// @ts-ignore
import SelectTargetsDropdown from "components/forms/fields/SelectTargetsDropdown";
import PackQueriesTable from "components/queries/PackQueriesTable";

const baseClass = "edit-pack-form";

interface IEditPackForm {
  className?: string;
  handleSubmit: (formData: IEditPackFormData) => void;
  onCancelEditPack: () => void;
  onFetchTargets?: (
    query: IQuery,
    targetsResponse: ITargetsAPIResponse
  ) => boolean;
  onAddPackQuery: () => void;
  onEditPackQuery: (selectedQuery: IScheduledQuery) => void;
  onRemovePackQueries: (selectedTableQueryIds: number[]) => void;
  targetsCount?: number;
  isPremiumTier?: boolean;
  formData: IEditPackFormData;
  scheduledQueries: IScheduledQuery[];
  isLoadingPackQueries: boolean;
  isUpdatingPack: boolean;
}

interface IEditPackFormData {
  name: string;
  description: string;
  targets: ITarget[];
}

const EditPackForm = ({
  className,
  handleSubmit,
  onCancelEditPack,
  onFetchTargets,
  onAddPackQuery,
  onEditPackQuery,
  onRemovePackQueries,
  scheduledQueries,
  isLoadingPackQueries,
  targetsCount,
  isPremiumTier,
  formData,
  isUpdatingPack,
}: IEditPackForm): JSX.Element => {
  const { t } = useTranslation("queries");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [packName, setPackName] = useState(formData.name);
  const [packDescription, setPackDescription] = useState(formData.description);
  const [packFormTargets, setPackFormTargets] = useState<ITarget[]>(
    formData.targets
  );

  useDeepEffect(() => {
    if (formData.targets) {
      setPackFormTargets(formData.targets);
    }
  }, [formData]);

  const onChangePackName = (value: string) => {
    setPackName(value);
  };

  const onChangePackDescription = (value: string) => {
    setPackDescription(value);
  };

  const onChangePackTargets = (value: ITarget[]) => {
    setPackFormTargets(value);
  };

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (packName === "") {
      return setErrors({
        ...errors,
        name: t("packs.create.nameRequired"),
      });
    }

    handleSubmit({
      name: packName,
      description: packDescription,
      targets: [...packFormTargets],
    });
  };

  return (
    <form
      className={`${baseClass} ${className}`}
      onSubmit={onFormSubmit}
      autoComplete="off"
    >
      <h1>{t("packs.edit.title")}</h1>
      <InputField
        onChange={onChangePackName}
        value={packName}
        placeholder={t("packs.create.namePlaceholder")}
        label={t("packs.create.nameLabel")}
        name="name"
        error={errors.name}
        inputWrapperClass={`${baseClass}__pack-title`}
      />
      <InputField
        onChange={onChangePackDescription}
        value={packDescription}
        inputWrapperClass={`${baseClass}__pack-description`}
        label={t("packs.create.descriptionLabel")}
        name="description"
        placeholder={t("packs.create.descriptionPlaceholder")}
        type="textarea"
      />
      <SelectTargetsDropdown
        label={t("packs.create.targetsLabel")}
        name="selected-pack-targets"
        onFetchTargets={onFetchTargets}
        onSelect={onChangePackTargets}
        selectedTargets={packFormTargets}
        targetsCount={targetsCount}
        isPremiumTier={isPremiumTier}
      />
      <PackQueriesTable
        onAddPackQuery={onAddPackQuery}
        onEditPackQuery={onEditPackQuery}
        onRemovePackQueries={onRemovePackQueries}
        scheduledQueries={scheduledQueries}
        isLoadingPackQueries={isLoadingPackQueries}
      />
      <div className={`${baseClass}__pack-buttons`}>
        <Button onClick={onCancelEditPack} type="button" variant="inverse">
          {t("packs.edit.cancelButton")}
        </Button>
        <Button
          type="submit"
          className="save-loading"
          isLoading={isUpdatingPack}
        >
          {t("packs.edit.saveButton")}
        </Button>
      </div>
    </form>
  );
};

export default EditPackForm;
