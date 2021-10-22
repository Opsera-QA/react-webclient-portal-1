import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import aksStepActions from "../aks-step-actions";

function AksResourceGroupSelectInput({
                                 fieldName,
                                 dataObject,
                                 setDataObject,
                                 azureToolConfigId,
                                 azureConfig,
                                 azureApplication,
                                 applicationData,
                                 textField,
                                 valueField
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
    if (isValidToolConfig() && isValidApplication()) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, azureApplication, azureConfig, applicationData]);

  const isValidApplication = () => {
    return azureApplication && azureApplication != "" && azureApplication !== null && applicationData;
  };

  const isValidToolConfig = () => {
    return azureToolConfigId && azureToolConfigId != "" && azureToolConfigId !== null && azureConfig;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Resource Groups");
      setErrorMessage("No Resource Groups available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await aksStepActions.getAzureResourceGroups(
      getAccessToken,
      cancelSource,
      azureConfig,
      applicationData
    );
    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No resource groups found with this azure configuration");
      setErrorMessage("No Resource Groups found");
    }
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <FontAwesomeIcon icon={faSync} className="pr-1" />
          Click here to refresh Resource Groups
        </small>
      );
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({ ...newDataObject });
    return;
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={azureRegionList}
        busy={isLoading}
        setDataFunction={handleDTOChange}
        disabled={isLoading}
        placeholder={placeholder}
        textField={textField}
        valueField={valueField}
        errorMessage={errorMessage}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AksResourceGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

AksResourceGroupSelectInput.defaultProps = {
  fieldName: "resourceGroupName",
  textField: "name",
  valueField: "name",
};

export default AksResourceGroupSelectInput;
