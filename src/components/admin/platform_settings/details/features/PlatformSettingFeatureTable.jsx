import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faFileBinary } from "@fortawesome/pro-light-svg-icons";
import {
  platformSettingFeatureMetadata
} from "components/admin/platform_settings/details/features/platformSettingFeature.metadata";
import NewPlatformSettingFeatureOverlay
  from "components/admin/platform_settings/details/features/NewPlatformSettingFeatureOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import platformSettingFeatureConstants
  from "@opsera/definitions/constants/platform/settings/features/platformSettingFeature.constants";

export default function PlatformSettingFeatureTable(
  {
    platformSettingsId,
    loadData,
    handleRowSelectFunction,
    isLoading,
    features,
  }) {
  const fields = platformSettingFeatureMetadata.fields;
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const createEndpoint = () => {
    toastContext.showOverlayPanel(
      <NewPlatformSettingFeatureOverlay
        platformSettingsId={platformSettingsId}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const columns = useMemo(
    () => [
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "name"), platformSettingFeatureConstants.getLabelForInUsePlatformSettingFeatureName),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={features}
        onRowSelect={handleRowSelectFunction}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createEndpoint}
      body={getTable()}
      isLoading={isLoading}
      metadata={platformSettingFeatureMetadata}
      titleIcon={faFileBinary}
      title={"Features"}
      className={"mt-2"}
    />
  );
}

PlatformSettingFeatureTable.propTypes = {
  platformSettingsId: PropTypes.string,
  loadData: PropTypes.func,
  handleRowSelectFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  features: PropTypes.array,
};