import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import octopusActions from "../../../octopus-actions";

function AzureAcrPushResourceGroupSelectInput({
                                              fieldName,
                                              dataObject,
                                              setDataObject,
                                              azureToolConfigId,
                                              azureConfig,
                                              azureApplication,
                                              applicationData,
                                            }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureResourceGroupList, setAzureResourceGroupList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select an Azure Resource Group");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureResourceGroupList([]);
    if (isValidToolConfig() && isValidApplication() && azureConfig && applicationData) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication, azureConfig, applicationData]);

  const isValidApplication = () => {
    return azureApplication && azureApplication != "" && azureApplication !== null;
  };

  const isValidToolConfig = () => {
    return azureToolConfigId && azureToolConfigId != "" && azureToolConfigId !== null;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Resource Groups");
      setErrorMessage("No Resource Groups available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await octopusActions.getAzureResourceGroups(
      getAccessToken,
      cancelSource,
      azureConfig,
      applicationData
    );

    const result = response?.data?.data;
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureResourceGroupList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No resource groups found with this azure configuration");
      setErrorMessage("No Azure Resource Groups have been found associated with this Azure Account");
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={azureResourceGroupList}
      busy={isLoading}
      valueField={"name"}
      textField={"name"}
      disabled={isLoading}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

AzureAcrPushResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
};

AzureAcrPushResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroupName",
};

export default AzureAcrPushResourceGroupSelectInput;
