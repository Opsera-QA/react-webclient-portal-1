import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import azureTaskActions from "../azure-cluster-actions";
import IconBase from "components/common/icons/IconBase";

function AzureKubeVersionsSelectInput({
                                        fieldName,
                                        dataObject,
                                        setDataObject,
                                        azureToolConfigId,
                                        azureConfig,
                                        azureApplication,
                                        applicationData,
                                        region
                                      }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureKubeVersions, setAzureKubeVersions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Azure Region");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureKubeVersions([]);
    if (isValidToolConfig() && isValidApplication() && region?.length > 0) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication, azureConfig, applicationData, region]);

  const isValidApplication = () => {
    return azureApplication && azureApplication != "" && azureApplication !== null && applicationData;
  };

  const isValidToolConfig = () => {
    return azureToolConfigId && azureToolConfigId != "" && azureToolConfigId !== null && azureConfig;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureKubeVersionss(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Kubernetes Versions");
      setErrorMessage("No Kubernetes Versions available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureKubeVersionss = async (cancelSource = cancelTokenSource) => {
    const response = await azureTaskActions.getKubeVersions(
      getAccessToken,
      cancelSource,
      azureConfig,
      applicationData,
      dataObject
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureKubeVersions(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No regions found with this azure configuration");
      setErrorMessage("No Azure Kubernetes Versions found");
    }
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Azure Kubernetes Versions
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
        selectOptions={azureKubeVersions}
        busy={isLoading}
        valueField={"version"}
        textField={"version"}
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

AzureKubeVersionsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
  region: PropTypes.string
};

AzureKubeVersionsSelectInput.defaultProps = {
  fieldName: "aksKubeVersion",
};

export default AzureKubeVersionsSelectInput;
