import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import azureActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aks_service_deploy/aks-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";

function ArgoAzureClusterSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    applicationId,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Cluster");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setAzureRegionList([]);
    if (hasStringValue(applicationId) === true && hasStringValue(azureToolConfigId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Clusters");
      setErrorMessage("No Clusters available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the clusters instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setPlaceholderText("Error Pulling Clusters!");
      setErrorMessage("Could not find Tool to grab Clusters.");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setPlaceholderText("Error Pulling Clusters!");
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    updateClientDetails(applicationData?.configuration);

    const azureResponse = await azureActions.getAzureClusters(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration
    );

    const result = azureResponse?.data?.data;
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No clusters found with this azure configuration");
      setErrorMessage("No Clusters found");
    }
  };

  const updateClientDetails = (config) => {
    let newDataObject = { ...model };
    newDataObject.setData("clientId", config?.clientId?.vaultKey);
    newDataObject.setData("clientSecret", config?.clientSecret?.vaultKey);
    setModel({ ...newDataObject });
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={azureRegionList}
      busy={isLoading}
      disabled={isLoading}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

ArgoAzureClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  applicationId: PropTypes.string,
};

ArgoAzureClusterSelectInput.defaultProps = {
  fieldName: "clusterName",
  textField: "clusterName",
  valueField: "clusterName",
};

export default ArgoAzureClusterSelectInput;
