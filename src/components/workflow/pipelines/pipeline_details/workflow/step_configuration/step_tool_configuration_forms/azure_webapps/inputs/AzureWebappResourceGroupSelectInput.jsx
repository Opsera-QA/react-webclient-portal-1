import React, { useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azureFunctionsActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/azure-functions-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureWebappResourceGroupSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    azureApplication,
    textField,
    valueField,
    disabled
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Resource Group");
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegionList([]);

    if (hasStringValue(azureToolConfigId) && hasStringValue(azureApplication) && !disabled) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Resource Groups");
      setErrorMessage(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setPlaceholderText("Error Pulling Resource Group!");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, azureApplication);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setPlaceholderText("Error Pulling Resource Group!");      
      return;
    }

    const resourceGroupResponse = await azureFunctionsActions.getAzureResourceGroups(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration
    );
    const result = resourceGroupResponse?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No resource groups found with this azure configuration");      
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    console.log({fieldName, selectedOption});
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption.name);
    newDataObject.setDefaultValue("webappName");
    setModel({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={azureRegionList}
        busy={isLoading}
        disabled={isLoading || disabled}
        placeholder={placeholder}
        textField={textField}
        valueField={valueField}
        error={errorMessage}
        setDataFunction={setDataFunction}
      />
  );
}

AzureWebappResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  disabled: PropTypes.bool
};

AzureWebappResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroupName",
  textField: "name",
  valueField: "name",
};

export default AzureWebappResourceGroupSelectInput;
