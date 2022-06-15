import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import azureFunctionsActions from "../azureZipDeployment.actions";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";

function AzureContainerSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  azureToolConfigId,
  applicationId,
  storageName,
  resourceGroup,
  textField,
  valueField,
  existingContainer
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegionList, setAzureRegionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Container");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    setAzureRegionList([]);
    if (
      hasStringValue(applicationId) === true &&
      hasStringValue(azureToolConfigId) === true &&
      hasStringValue(storageName) === true &&
      hasStringValue(resourceGroup) === true
    ) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, applicationId, storageName, resourceGroup, existingContainer]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Containers");
      setErrorMessage("No Containers available.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: We should make a route on node where you can pass an azure tool ID and an azure Application ID
  //  and return the containers instead of constructing the complex query here on React
  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(
      getAccessToken,
      cancelSource,
      azureToolConfigId,
    );
    const tool = response?.data?.data;

    if (tool == null && !isLoading) {
      setPlaceholderText("Error Pulling Containers!");
      setErrorMessage("Could not find Tool to grab Containers.");
      return;
    }

    const applicationResponse =
      await toolsActions.getRoleLimitedToolApplicationByIdV2(
        getAccessToken,
        cancelSource,
        azureToolConfigId,
        applicationId,
      );
    const applicationData = applicationResponse?.data?.data;

    if (applicationData == null) {
      setPlaceholderText("Error Pulling Containers!");
      setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
      return;
    }

    const azureResponse = await azureFunctionsActions.getAzureContainers(
      getAccessToken,
      cancelSource,
      tool,
      applicationData?.configuration,
      storageName,
      resourceGroup,
    );

    const result = azureResponse?.data?.data;
    console.log(result);
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No containers found with this azure configuration");
      setErrorMessage("No Containers found");
    }
  };

  const getContainerInput = () => {
    if (dataObject?.getData("existingContainer")) {
      return (
        <SelectInputBase
          fieldName={fieldName}
          dataObject={dataObject}
          textField={textField}
          valueField={valueField}
          setDataObject={setDataObject}
          selectOptions={azureRegionList}
          busy={isLoading}
          disabled={isLoading}
          placeholder={placeholder}
          errorMessage={errorMessage}
        />
      );
    } else {
      return (
        <TextInputBase
          fieldName={"containerName"}
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
  };

  return getContainerInput();
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
  existingContainer: PropTypes.bool
};

AzureContainerSelectInput.defaultProps = {
  fieldName: "containerName",
  textField: "containerName",
  valueField: "containerName",
};

export default AzureContainerSelectInput;
