import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import helmStepActions from "../../helm-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureContainerSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    applicationId,
    storageName,
    resourceGroup,
    textField,
    valueField
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setAzureRegionList([]);
    if (hasStringValue(applicationId) === true && hasStringValue(azureToolConfigId) === true && hasStringValue(storageName) === true && hasStringValue(resourceGroup) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, applicationId, storageName, resourceGroup]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setError(error);
      setErrorMessage("No Containers available.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the containers instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setErrorMessage("Could not find Tool to grab Containers.");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    const azureResponse = await helmStepActions.getAzureContainers(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration,
      storageName,
      resourceGroup
    );

    const result = azureResponse?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setErrorMessage("No Containers found");
    }
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        textField={textField}
        valueField={valueField}
        setDataObject={setModel}
        selectOptions={azureRegionList}
        busy={isLoading}
        disabled={isLoading}
        error={error}
        errorMessage={errorMessage}
      />
  );
}

AzureContainerSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  applicationId: PropTypes.string,
  storageName: PropTypes.string,
  resourceGroup: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

AzureContainerSelectInput.defaultProps = {
  fieldName: "containerName",
  textField: "containerName",
  valueField: "containerName",
};

export default AzureContainerSelectInput;
