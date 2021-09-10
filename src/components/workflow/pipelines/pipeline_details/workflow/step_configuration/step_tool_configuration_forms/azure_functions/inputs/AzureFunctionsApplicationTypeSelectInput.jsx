import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import azureFunctionsActions from "../azure-functions-step-actions";

function AzureFunctionsApplicationTypeSelectInput({
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
  const [azureApplicationTypeList, setAzureApplicationTypeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Application Type");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureApplicationTypeList([]);
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
      await loadAzureApplicationTypes(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Application Types");
      setErrorMessage("No Application Types available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureApplicationTypes = async (cancelSource = cancelTokenSource) => {
    const response = await azureFunctionsActions.getApplicationType(
      getAccessToken,
      cancelSource,
      azureConfig,
      applicationData,
      dataObject
    );

    const result = response?.data?.data;
    
    const applicationTypesList = result.map((el) => ({
      name: `${el?.properties?.display} - ( ${el?.properties.name} )`,
    }));

    console.log(applicationTypesList);

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureApplicationTypeList(applicationTypesList);
    }

    if (result?.length === 0) {
      setPlaceholderText("No application types found with this azure configuration");
      setErrorMessage("No Azure Application Types found");
    }
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <FontAwesomeIcon icon={faSync} className="pr-1" />
          Click here to refresh Azure Application Types
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
        selectOptions={azureApplicationTypeList}
        busy={isLoading}
        valueField={"name"}
        textField={"name"}
        disabled={isLoading || azureApplicationTypeList.length === 0}
        placeholder={placeholder}
        errorMessage={errorMessage}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AzureFunctionsApplicationTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
  region: PropTypes.string
};

AzureFunctionsApplicationTypeSelectInput.defaultProps = {
  fieldName: "applicationType",
};

export default AzureFunctionsApplicationTypeSelectInput;
