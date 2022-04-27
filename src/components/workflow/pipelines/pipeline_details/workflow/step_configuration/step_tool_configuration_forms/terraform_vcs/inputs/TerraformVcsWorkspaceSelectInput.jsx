import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import terraformVcsStepActions from "../terraform-vcs-step-actions";

function TerraformVcsWorkspaceSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId}) {
  const toastContext = useContext(DialogToastContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState("Select Workspaces");


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [dataObject.getData("organizationName")]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadWorkspaces(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadWorkspaces = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await terraformVcsStepActions.getWorkspaces(getAccessToken, cancelSource, toolId, dataObject.getData("organizationName"));
      const tempWorkspaces = res?.data?.data;

      if(Array.isArray(tempWorkspaces)) {
        setWorkspaces(tempWorkspaces);
        setPlaceholderText("Select Workspaces");
        return;
      }
      setWorkspaces([]);
      if (!isLoading && (workspaces == null || workspaces.length === 0)) {
        setPlaceholderText("No workspaces found");
      }
    } catch (error) {
      if (!isLoading && (workspaces == null || workspaces.length === 0)) {
        setPlaceholderText("Workspace information is missing or unavailable!");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    newDataObject.setData("workspaceId", selectedOption?.id);
    newDataObject.setData("workspaceName", selectedOption?.name);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fieldName) => {
    let newDataObject = dataObject;    
    newDataObject.setDefaultValue("workspaceName");
    newDataObject.setDefaultValue("workspaceId");
    setDataObject({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={workspaces}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
      />
  );
}

TerraformVcsWorkspaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string
};

TerraformVcsWorkspaceSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "workspaceName",
  disabled: false
};

export default TerraformVcsWorkspaceSelectInput;
