import React, { useState } from "react";
import PropTypes from "prop-types";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";

function ParametersView(
  {
    isLoading,
    loadData,
    parameterList,
    parameterFilterModel,
  }) {
  const [parameterData, setParameterData] = useState(undefined);

  const getTableView = () => {
    return (
      <ParameterTable
        isLoading={isLoading}
        loadData={loadData}
        data={parameterList}
        parameterFilterModel={parameterFilterModel}
        setParameterData={setParameterData}
        parameterData={parameterData}
      />
    );
  };

  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        parameterModel={parameterData}
        setParameterModel={setParameterData}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer
      detailPanel={getEditorPanel()}
      table={getTableView()}
    />
  );
}

ParametersView.propTypes = {
  parameterList: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  parameterFilterModel: PropTypes.object,
  parameterRoleDefinitions: PropTypes.object,
};

export default ParametersView;