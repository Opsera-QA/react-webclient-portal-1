import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import azureActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aks_service_deploy/aks-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureResourceGroupSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    azureApplication,
    textField,
    valueField,
    clusterName,
    disabled
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegionList([]);

    if (hasStringValue(azureToolConfigId) && hasStringValue(azureApplication) && hasStringValue(clusterName) && !disabled) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication, clusterName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the resource groups instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;
    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, azureApplication);
    const applicationData = applicationResponse?.data?.data;


    const resourceGroupResponse = await azureActions.getAzureResourceGroups(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration,
      clusterName
    );
    const result = resourceGroupResponse?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setError(undefined);
      setAzureRegionList(result);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureRegionList}
      busy={isLoading}
      disabled={isLoading || disabled}
      singularTopic={"Resource Group"}
      pluralTopic={"Resource Groups"}
      textField={textField}
      valueField={valueField}
      error={error}
    />
  );
}

AzureResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  clusterName: PropTypes.string,
  disabled: PropTypes.bool
};

AzureResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroup",
  textField: "resourceGroup",
  valueField: "resourceGroup",
};

export default AzureResourceGroupSelectInput;
