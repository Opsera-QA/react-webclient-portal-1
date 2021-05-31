import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ParameterModel from "components/inventory/parameters/parameter.model";
import {persistUpdatedRecord} from "components/common/buttons/saving/saving-helpers-v2";

function ParametersView({isLoading, loadData, parameterList, parameterMetadata, customerAccessRules}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
  const parameterRef = useRef({});
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  // TODO: Should we put this into the table itself and pass down the state object?
  const onRowSelect = async (grid, row, column, e) => {
    const selectedModel = getModel();
    // // Don't change rows if invalid, save before changing rows if valid
    if (selectedModel != null) {
      // We are still on same row
      if (selectedModel.getData("_id") === row?._id) {
        return true;
      }

      // Show would you like to save. If true, run save and on success change rows. On failure return false;
      if (selectedModel?.isChanged()) {
        const response = await persistUpdatedRecord(selectedModel, toastContext);

        if (response === false) {
          return false;
        }
      }
    }

    let newRow = {...row};
    delete newRow["id"];
    delete newRow["$height"];
    const newModel = {...new ParameterModel(newRow, parameterMetadata, false, getAccessToken, cancelTokenSource, loadData)};

    parameterRef.current = {...newModel};
    setParameterData({...newModel});
    return true;
  };

  const onCellEdit = (value, row, column) => {
    const selectedModel = {...getModel()};

    // Value should only be undefined if canceled out
    if (value !== undefined) {
      const fieldName = column?.id;
      selectedModel.setData(fieldName, value);

      const fieldErrors = selectedModel.isFieldValid(fieldName);

      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        toastContext.showFormErrorToast(fieldErrors[0]);
        return false;
      }

      parameterRef.current = {...selectedModel};
      setParameterData({...selectedModel});
      return true;
    }

    return true;
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
        cancelTokenSource={cancelTokenSource}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
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
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  customerAccessRules: PropTypes.object,
};

export default ParametersView;