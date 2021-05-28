import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import Model from "core/data_model/model";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";

function ParametersView({isLoading, loadData, parameterList, parameterMetadata, customerAccessRules, isMounted}) {
  const toastContext = useContext(DialogToastContext);
  const [parameterData, setParameterData] = useState(undefined);

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  // TODO: Add logic to check if changed, if so check validity.
  //  If valid, save and move to next row.
  //  If invalid, don't change rows and throw error toast
  const onRowSelect = (grid, row, column, e) => {
    // Don't change rows if invalid, save before changing rows if valid
    if (parameterData != null) {
      // && parameterData.isChanged()) {
      return false;
    }

    let newRow = {...row};
    delete newRow["id"];
    delete newRow["$height"];
    setParameterData(new Model(newRow, parameterMetadata, false));
  };

  const onCellEdit = (value, row, column) => {
    let newRow = {...row};
    delete newRow["id"];
    delete newRow["$height"];
    const newModel = new Model({...newRow}, parameterMetadata, false);

    setParameterData({...newModel});
  };

  const getTableView = () => {
    return (
      <ParameterTable
        isLoading={isLoading}
        loadData={loadData}
        data={parameterList}
        parameterMetadata={parameterMetadata}
        customerAccessRules={customerAccessRules}
        onRowSelect={onRowSelect}
        onCellEdit={onCellEdit}
      />
    );
  };

  // TODO: Create editor panel container for table/editor panel
  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        parameterModel={parameterData}
        parameterMetadata={parameterMetadata}
        customerAccessRules={customerAccessRules}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer detailPanel={getEditorPanel()} table={getTableView()} />
  );
}

ParametersView.propTypes = {
  parameterList: PropTypes.array,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  customerAccessRules: PropTypes.object,
  isMounted: PropTypes.object
};

export default ParametersView;