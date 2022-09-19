import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import { platformSettingsMetadata } from "components/admin/platform_settings/platformSettings.metadata";
import NewPlatformSettingsOverlay from "components/admin/platform_settings/create/NewPlatformSettingsOverlay";

export default function PlatformSettingsTable(
  {
    platformSettings,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = platformSettingsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "platformId")),
      // getLimitedTableTextColumn(getField(fields, "description"), 100),
      // getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), platformSystemParameterConstants.getLabelForSystemParameterType),
    ],
    []
  );

  const noDataMessage = "No platform settings have been registered.";

  const onRowSelect = (rowData) => {
    history.push(`/admin/platform/settings/details/${rowData.original._id}`);
  };

  const addRecordFunction = () => {
    toastContext.showOverlayPanel(
      <NewPlatformSettingsOverlay
        loadData={loadData}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        noDataMessage={noDataMessage}
        data={platformSettings}
        columns={columns}
      />
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        addRecordFunction={addRecordFunction}
        isLoading={isLoading}
        body={getTable()}
        titleIcon={faStream}
        title={"System Parameters"}
        type={"System Parameter"}
        className={"px-2 pb-2"}
      />
  );
}

PlatformSettingsTable.propTypes = {
  platformSettings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};