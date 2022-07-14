import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import azureWebappsActions from "../azureWebapps-step-actions";


function AzureWebappSelectInput(
  {
    fieldName,
    model,
    setModel,
    azureToolConfigId,
    applicationId,
    resourceGroup
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Azure Webapp");
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setAzureRegionList([]);
    if (hasStringValue(applicationId) === true && hasStringValue(azureToolConfigId) === true && hasStringValue(resourceGroup) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, applicationId, resourceGroup]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadWebapps(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Webapps");
      setErrorMessage(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadWebapps = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;

    if (tool == null) {
      setPlaceholderText("Error Pulling Azure Webapps!");
      setErrorMessage("Could not find Tool to grab Azure Webapps.");
      return;
    }

    const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(getAccessToken, cancelSource, azureToolConfigId, applicationId);
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setPlaceholderText("Error Pulling Azure Webapps!");
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    const azureResponse = await azureWebappsActions.getAzureWebapps(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration,
      resourceGroup
    );

    const result = azureResponse?.data?.data;
    if (Array.isArray(result) && result?.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No azure Webapps found with this azure configuration");
      setErrorMessage("No Azure Webapps found");
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      textField={"name"}
      valueField={"name"}
      setDataObject={setModel}
      selectOptions={azureRegionList}
      busy={isLoading}
      disabled={isLoading}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

AzureWebappSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  applicationId: PropTypes.string,
  resourceGroup: PropTypes.string,
};

AzureWebappSelectInput.defaultProps = {
  fieldName: "webappName",
};

export default AzureWebappSelectInput;
