import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import azurePipelineActions 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/azure-pipeline-actions";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";

function DockerCliAzureRegistryNameSelectInput({
  fieldName,
  model,
  setModel,
  azureToolConfigId,
  resource,
  applicationId,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegistryList, setAzureRegistryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select an Azure Registry");
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegistryList([]);
    setErrorMessage("");

    if (
      hasStringValue(azureToolConfigId) === true &&
      hasStringValue(resource) === true &&
      hasStringValue(applicationId)
    ) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, resource, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Registry!");
      setErrorMessage(error);      
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;
    let applicationData = {};

    if (tool == null) {
      setPlaceholderText("Error Pulling Clusters!");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(
      getAccessToken,
      cancelSource,
      azureToolConfigId,
      applicationId
    );
    applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setPlaceholderText("Error Pulling Clusters!");      
      return;
    }

    const azureResponse = await azurePipelineActions.getAzureRegistries(
      getAccessToken,
      cancelSource,
      tool,
      resource,
      "azure",
      applicationData
    );

    const result = azureResponse?.data?.data;
    
    if (Array.isArray(result) && result.length > 0) {      
      setAzureRegistryList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No registry found with this azure configuration");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...model };
    newDataObject.setData(fieldName, selectedOption.name);
    newDataObject.setData("acrLoginUrl", selectedOption.url);
    setModel({ ...newDataObject });
  };

  const getInfoText = () => {
    if (model?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Azure Registries
        </small>
      );
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        selectOptions={azureRegistryList}
        busy={isLoading}
        valueField={"name"}
        textField={"name"}
        disabled={isLoading}
        placeholder={placeholder}
        error={errorMessage}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

DockerCliAzureRegistryNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  resource: PropTypes.string,
  applicationId: PropTypes.string,
};

DockerCliAzureRegistryNameSelectInput.defaultProps = {
  fieldName: "azureRegistryName",
};

export default DockerCliAzureRegistryNameSelectInput;
