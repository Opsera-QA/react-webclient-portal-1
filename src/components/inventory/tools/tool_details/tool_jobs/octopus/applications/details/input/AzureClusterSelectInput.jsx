import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import octopusActions from "../../../octopus-actions";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function AzureAcrPushClusterNameSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  azureToolConfigId,
  azureConfig,
  resource,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureClusterList, setAzureClusterList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select an Azure Cluster");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureClusterList([]);
    if (isValidToolConfig() && azureConfig && resource) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureConfig]);

  const isValidToolConfig = () => {
    return azureToolConfigId && azureToolConfigId != "" && azureToolConfigId !== null;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Clusters");
      setErrorMessage("No Clusters available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await octopusActions.getAzureClusters(getAccessToken, cancelSource, azureConfig, resource);

    const result = response?.data?.data;
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureClusterList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No clusters found with this azure configuration");
      setErrorMessage("No Azure Clusters have been found associated with this Azure Account");
    }
  };

  const setAzureCluster = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, value);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, "");
    setDataObject({ ...newDataObject });
  };

  const getInfoText = () => {
    if (dataObject.getData("resource").length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to fetch Azure Clusters
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
        clearDataFunction={clearDataFunction}
        setDataFunction={setAzureCluster}
        selectOptions={azureClusterList}
        busy={isLoading}
        valueField={"id"}
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

AzureAcrPushClusterNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureConfig: PropTypes.object,
  resource: PropTypes.string,
};

AzureAcrPushClusterNameSelectInput.defaultProps = {
  fieldName: "clusterName",
};

export default AzureAcrPushClusterNameSelectInput;
