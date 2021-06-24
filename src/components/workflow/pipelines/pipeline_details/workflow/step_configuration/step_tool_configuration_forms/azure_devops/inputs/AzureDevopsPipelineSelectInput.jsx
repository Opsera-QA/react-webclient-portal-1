import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azurePipelineActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/azure-pipeline-actions";
import {processError} from "utils/helpers";

function AzureDevopsPipelineSelectInput({ fieldName, model, setModel, disabled, organization, projectName, valueField, toolConfigId}) {
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [azurePipelines, setAzurePipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [placeholderText, setPlaceholderText] = useState("Select an Azure DevOps Pipeline");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setPlaceholderText("Select an Azure DevOps Pipeline");
    setAzurePipelines([]);

    if (organization != null && organization !== "" && projectName != null && projectName !== "" && toolConfigId != null && toolConfigId !== "") {
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
  }, [projectName, organization, toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzurePipelines(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("There was an error pulling Azure Pipelines!");
        setErrorMessage(`There was an error pulling Azure Pipelines: ${processError(error)}`);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAzurePipelines = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const response = await azurePipelineActions.getAzurePipelines(getAccessToken, cancelSource, model, user._id);
    const azurePipelines = response?.data?.data;

    if (Array.isArray(azurePipelines) && azurePipelines.length > 0) {
      setErrorMessage("");
      setAzurePipelines(azurePipelines);
    }
  };

  const formatText = (item) => {
    if (item["name"] == null) {
      return `Azure Pipeline ID: ${item}`;
    }

    return `${item["name"]} (Revision: ${item["revision"]})`;
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azurePipelines}
      busy={isLoading}
      errorMessage={errorMessage}
      valueField={valueField}
      textField={(item) => formatText(item)}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

AzureDevopsPipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  valueField: PropTypes.string,
  organization: PropTypes.string,
  projectName: PropTypes.string,
  toolConfigId: PropTypes.string
};

AzureDevopsPipelineSelectInput.defaultProps = {
  valueField: "id",
};

export default AzureDevopsPipelineSelectInput;