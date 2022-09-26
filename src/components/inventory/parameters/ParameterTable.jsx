import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import NewParameterOverlay from "components/inventory/parameters/NewParameterOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import {
  getColumnHeader, getColumnId,
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/column_definitions/model-table-column-definitions";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import customParametersMetadata
  from "@opsera/definitions/constants/registry/custom_parameters/customParameters.metadata";
import CustomParameterRoleHelper from "@opsera/know-your-role/roles/registry/parameters/customParameterRole.helper";

export const getParameterValueColumn = (field, className, width) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row) {
      if (row?.getData("vaultEnabled") === true) {
        return "[Encrypted Value]";
      }

      return (row?.getData("value"));
    },
    class: className,
  };
};

function ParameterTable(
  {
    data,
    setParameterData,
    parameterData,
    loadData,
    isLoading,
    parameterFilterModel,
  }) {
  const fields = customParametersMetadata.fields;
  const {
    isMounted,
    userData,
    toastContext,
  } = useComponentStateReference();
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline", 350),
      getParameterValueColumn(getField(fields, "value")),
      getTableBooleanIconColumn(getField(fields, "vaultEnabled"), undefined, 150),
    ],
    [fields]
  );

  const createParameter = () => {
    toastContext.showOverlayPanel(
      <NewParameterOverlay
        loadData={loadData}
      />
    );
  };

  const getParameterTable = () => {
    return (
      <VanitySelectionTable
        className={"table-no-border"}
        noDataMessage={"No Parameters have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        setParentModel={setParameterData}
        paginationModel={parameterFilterModel}
        tableHeight={"calc(25vh)"}
        parentModel={parameterData}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = CustomParameterRoleHelper.canCreateParameters(userData);

    if (addAllowed === true) {
      return createParameter;
    }
  };

  return (
    <VanityDataContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      isLoading={isLoading}
      body={getParameterTable()}
      paginationModel={parameterFilterModel}
      metadata={customParametersMetadata}
      titleIcon={faHandshake}
      title={"Parameters"}
      className={"px-2 pb-2"}
    />
  );
}

ParameterTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  setParameterData: PropTypes.func,
  parameterFilterModel: PropTypes.object,
  parameterData: PropTypes.object
};

export default ParameterTable;