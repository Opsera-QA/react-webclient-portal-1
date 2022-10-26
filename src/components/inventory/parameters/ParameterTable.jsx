import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import NewParameterOverlay from "components/inventory/parameters/NewParameterOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import customParametersMetadata
  from "@opsera/definitions/constants/registry/custom_parameters/customParameters.metadata";
import CustomParameterRoleHelper from "@opsera/know-your-role/roles/registry/parameters/customParameterRole.helper";
import useGetParameterModel from "components/inventory/parameters/hooks/useGetParameterModel";
import {
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";

export default function ParameterTable(
  {
    data,
    setParameterModel,
    parameterModel,
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
  const { getNewParameterModel } = useGetParameterModel();
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
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

  const handleRowSelectFunction = (selectedData) => {
    if (selectedData == null) {
      setParameterModel(undefined);
      return;
    }

    const newModel = getNewParameterModel(
      selectedData,
      false,
      setParameterModel,
      loadData,
    );

    setParameterModel(undefined);
    setParameterModel({...newModel});
  };

  const getParameterTable = () => {
    return (
      <VanitySelectionTable
        noDataMessage={"No Parameters have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        setParentModel={setParameterModel}
        paginationModel={parameterFilterModel}
        tableHeight={"calc(25vh)"}
        parentModel={parameterModel}
        handleRowSelectFunction={handleRowSelectFunction}
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
  setParameterModel: PropTypes.func,
  parameterFilterModel: PropTypes.object,
  parameterModel: PropTypes.object
};