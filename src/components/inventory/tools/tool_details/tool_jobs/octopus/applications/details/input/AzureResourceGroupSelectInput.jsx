import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import octopusActions from "../../../octopus-actions";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function AzureAcrPushResourceGroupSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  azureToolConfigId,
  azureConfig,
  resource,
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
    if (isValidToolConfig() && azureConfig && resource) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureConfig, resource]);

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
    const response = await octopusActions.getAzureResourceGroups(getAccessToken, cancelSource, azureConfig, resource);

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

  const getInfoText = () => {
    if (dataObject.getData("resource").length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to fetch Azure Resource Groups
        </small>
      );
    }
  };

  return (
    <>
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
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AzureAcrPushResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureConfig: PropTypes.object,
  resource: PropTypes.string,
};

AzureAcrPushResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroupName",
};

export default AzureAcrPushResourceGroupSelectInput;
