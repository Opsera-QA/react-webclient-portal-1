import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import octopusActions from "../octopus-step-actions";

function AzureAcrPushRepositoryTagsSelectInput({ dataObject, setDataObject ,disabled,azureConfig, applicationData,acrLoginUrl}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select option");
  const [repoTags,setRepoTags] = useState([]);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [acrLoginUrl]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      if(dataObject?.getData("acrLoginUrl").length > 0){
        await fetchAzureRepositoryTags(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Azure Repository Tags");
        setErrorMessage(`An Error Occurred Pulling Repository Tags: ${error}`);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchAzureRepositoryTags = async (cancelSource = cancelTokenSource) => {

    const response = await octopusActions.getAzureRepoTags(getAccessToken, cancelSource, dataObject,azureConfig, applicationData);
    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setRepoTags(result);
    }

    if (result?.length === 0){
      setPlaceholderText("No projects found with this configuration");
      setErrorMessage("No Azure Projects have been found associated with this Azure Tool Registry Account");
    }
  };

  if (!dataObject?.getData("isRollback")) {
    return null;
  }


  return (
    <SelectInputBase
      fieldName={"octopusVersion"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={repoTags}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled || isLoading || (repoTags == null || repoTags.length === 0)}
    />
  );
}

AzureAcrPushRepositoryTagsSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
  acrLoginUrl: PropTypes.string
};

AzureAcrPushRepositoryTagsSelectInput.defaultProps = {
  disabled:false
};

export default AzureAcrPushRepositoryTagsSelectInput;
