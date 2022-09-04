import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getLimitedTableTextColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faStream} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewPlatformSystemParameterOverlay
  from "components/admin/system_parameters/create/NewPlatformSystemParameterOverlay";
import { platformSystemParametersMetadata } from "components/admin/system_parameters/platformSystemParameters.metadata";
import { platformSystemParameterConstants } from "components/admin/system_parameters/platformSystemParameter.constants";

export default function PlatformSystemParameterTable(
  {
    systemParameters,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = platformSystemParametersMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), platformSystemParameterConstants.getLabelForSystemParameterType),
    ],
    []
  );

  const noDataMessage = "No system parameters have been registered.";

  const onRowSelect = (rowData) => {
    history.push(`/admin/platform/system-parameters/details/${rowData.original._id}`);
  };

  const addRecordFunction = () => {
    toastContext.showOverlayPanel(
      <NewPlatformSystemParameterOverlay
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
        data={systemParameters}
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

PlatformSystemParameterTable.propTypes = {
  systemParameters: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};