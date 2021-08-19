import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azurePipelineActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/azure-pipeline-actions";
import {processError} from "utils/helpers";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzureDevopsProjectSelectInput({ fieldName, model, setModel, disabled, organization, valueField, toolConfigId}) {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [azureProjects, setAzureProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [placeholderText, setPlaceholderText] = useState("Select an Azure DevOps Project");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setPlaceholderText("Select an Azure DevOps Project");
    setAzureProjects([]);

    if (organization != null && organization !== "" && toolConfigId != null && toolConfigId !== "") {
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
  }, [organization, toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureProjects(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("There was an error pulling Azure Projects!");
        setErrorMessage("No projects available.");
        toastContext.showErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAzureProjects = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const response = await azurePipelineActions.getAzureProjects(getAccessToken, cancelSource, model, user._id);
    const azureProjects = response?.data?.data;

    if (Array.isArray(azureProjects) && azureProjects.length > 0) {
      setErrorMessage("");
      setAzureProjects(azureProjects);
    }

    if (azureProjects?.length === 0){
      setPlaceholderText("No projects found with this configuration");
      setErrorMessage("No Azure Projects have been found associated with this Azure Tool Registry Account");
    }
  };

  const formatText = (item) => {
    if (item["name"] == null) {
      return `Azure Project ID: ${item}`;
    }

    return `${item["name"]}`;
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureProjects}
      busy={isLoading}
      errorMessage={errorMessage}
      valueField={valueField}
      textField={(item) => formatText(item)}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

AzureDevopsProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  valueField: PropTypes.string,
  organization: PropTypes.string,
  toolConfigId: PropTypes.string
};

AzureDevopsProjectSelectInput.defaultProps = {
  valueField: "id",
};

export default AzureDevopsProjectSelectInput;