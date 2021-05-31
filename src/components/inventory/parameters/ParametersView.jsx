import React, {useContext, useRef, useState} from "react";
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
  const parameterRef = useRef({});

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  // TODO: Add logic to check if changed, if so check validity.
  //  If valid, save and move to next row.
  //  If invalid, don't change rows and throw error toast
  const onRowSelect = (grid, row, column, e) => {
    const selectedModel = getModel();
    // Don't change rows if invalid, save before changing rows if valid
    if (selectedModel != null) {
      // We are still on same row
      if (selectedModel.getData("_id") === row?._id) {
        return true;
      }

      // Show would you like to save. If true, run save and on success change rows. On failure return false;
      if (selectedModel?.isChanged()) {
        console.log("selected item changed");
        return false;
      }
    }

    let newRow = {...row};
    delete newRow["id"];
    delete newRow["$height"];
    const newModel = {...new Model(newRow, parameterMetadata, false)};

    parameterRef.current = {...newModel};
    setParameterData({...newModel});
  };

  const onCellEdit = (value, row, column) => {
    const selectedModel = getModel();

    if (value !== undefined) {
      selectedModel.setData(column?.id, value);
      parameterRef.current = {...selectedModel};
      setParameterData({...selectedModel});
    }
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

  const getModel = () => {
    const selectedItem = parameterRef?.current;
    if (selectedItem && Object.keys(selectedItem).length !== 0) {
      return selectedItem;
    }
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