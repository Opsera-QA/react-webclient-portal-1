import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import azurePipelineActions from "../azure-pipeline-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureAcrPushRepositoryNameSelectInput({
  dataObject,
  setDataObject,
  disabled,
  acrLoginUrl,
  azureToolId,
  applicationId,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select option");
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setErrorMessage("");
    setRepoList([]);

    if (
      hasStringValue(acrLoginUrl) === true &&
      hasStringValue(azureToolId) === true &&
      (hasStringValue(dataObject?.getData("toolType")) && dataObject?.getData("toolType") === "azure"
        ? hasStringValue(applicationId)
        : true)
    ) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [acrLoginUrl, azureToolId, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAzureRepositoryList(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Azure Repository List");
        setErrorMessage(`An Error Occurred Pulling Repository List: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAzureRepositoryList = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolId);
    const tool = response?.data?.data;
    let applicationData = {};

    if (tool == null) {
      setPlaceholderText("Error Pulling Clusters!");
      setErrorMessage("Could not find Tool to grab Clusters.");
      return;
    }

    if (dataObject?.getData("toolType") === "azure") {
      const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(
        getAccessToken,
        cancelSource,
        azureToolId,
        applicationId
      );
      applicationData = applicationResponse?.data?.data;

      if (applicationData == null) {
        setPlaceholderText("Error Pulling Clusters!");
        setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
        return;
      }
    }

    const azureResponse = await azurePipelineActions.getAzureRepositories(
      getAccessToken,
      cancelSource,
      acrLoginUrl,
      tool,
      dataObject?.getData("toolType"),
      applicationData
    );
    const result = azureResponse?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setRepoList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No repositories found with this configuration");
      setErrorMessage("No Azure Repositories have been found associated with this Azure Tool Registry Account");
    }
  };

  return (
    <SelectInputBase
      fieldName={"azureRepoName"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={repoList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      errorMessage={errorMessage}
      placeholderText={placeholderText}
      disabled={disabled}
    />
  );
}

AzureAcrPushRepositoryNameSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  acrLoginUrl: PropTypes.string,
  azureToolId: PropTypes.string,
  applicationId: PropTypes.string,
};

export default AzureAcrPushRepositoryNameSelectInput;
