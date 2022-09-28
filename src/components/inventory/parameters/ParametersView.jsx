import React, { useState } from "react";
import PropTypes from "prop-types";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";

export default function ParametersView(
  {
    isLoading,
    loadData,
    parameterList,
    parameterFilterModel,
    parameterModel,
    setParameterModel,
  }) {
  const getTableView = () => {
    return (
      <ParameterTable
        isLoading={isLoading}
        loadData={loadData}
        data={parameterList}
        parameterFilterModel={parameterFilterModel}
        setParameterModel={setParameterModel}
        parameterModel={parameterModel}
      />
    );
  };

  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        parameterModel={parameterModel}
        setParameterModel={setParameterModel}
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
  parameterFilterModel: PropTypes.object,
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
};