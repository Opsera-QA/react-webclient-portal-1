import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import azureTaskActions from "../azure-cluster-actions";
import IconBase from "components/common/icons/IconBase";

function AzureRegionSelectInput({
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
  const [azureRegionList, setAzureRegionList] = useState([]);
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
      setPlaceholderText("There was an error pulling Azure Regions");
      setErrorMessage("No Regions available.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await azureTaskActions.getAzureRegions(
      getAccessToken,
      cancelSource,
      azureConfig,
      applicationData
    );

    const result = response?.data?.data;
    const listObject = result.map((el) => ({
      name: el.name,
      id: el.id,
      displayName: el.properties?.displayName,
    }));
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegionList(listObject);
    }

    if (result?.length === 0) {
      setPlaceholderText("No regions found with this azure configuration");
      setErrorMessage("No Azure Regions found");
    }
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Azure Regions
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
        selectOptions={azureRegionList}
        busy={isLoading}
        valueField={"name"}
        textField={"displayName"}
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

AzureRegionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  azureApplication: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
};

AzureRegionSelectInput.defaultProps = {
  fieldName: "region",
};

export default AzureRegionSelectInput;
