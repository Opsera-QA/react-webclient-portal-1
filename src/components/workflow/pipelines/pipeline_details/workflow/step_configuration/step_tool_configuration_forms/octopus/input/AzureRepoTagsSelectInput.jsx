import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import octopusActions from "../octopus-step-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import toolsActions from "components/inventory/tools/tools-actions";

function AzureAcrPushRepositoryTagsSelectInput({ dataObject, setDataObject, disabled, plan, stepId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Repository Tags");
  const [repoTags, setRepoTags] = useState([]);
  const [list, setList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setRepoTags([]);
      let pipelineSteps = formatStepOptions(plan, stepId);
      let acrStep = pipelineSteps.filter((step) => step?._id === dataObject?.getData("ecrPushStepId"));
      let acrConfig = acrStep?.length > 0 ? acrStep[0]?.tool?.configuration : [];
      await fetchAzureDetails(cancelSource);
      let azureToolList = list.filter((tool) => tool?.id === acrConfig?.azureToolConfigId);
      let azureTool = azureToolList?.length > 0 ? azureToolList[0] : [];
      await fetchAzureRepositoryTags(cancelSource, acrConfig, azureTool);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Azure Repository Tags");
        setErrorMessage(`An Error Occurred Pulling Repository Tags: ${error}`);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAzureDetails = async (cancelSource) => {
    setIsSearching(true);
    try {
      let results = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, "azure_account");
      const toolResponse = results?.data?.data;

      if (toolResponse) {
        let respObj = [];
        toolResponse.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            owner: item.owner,
            applications: item.applications,
          });
        });
        results = respObj;
      }
      const filteredList = results ? results.filter((el) => el.configuration !== undefined) : [];
      if (filteredList) {
        setList(filteredList);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  const fetchAzureRepositoryTags = async (cancelSource = cancelTokenSource, acrStep, azureTool) => {
    const response = await octopusActions.getAzureRepoTags(
      getAccessToken,
      cancelSource,
      dataObject,
      acrStep,
      azureTool
    );
    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setRepoTags(result);
      setPlaceholderText("Select Repository Tags");
    }

    if (result?.length === 0) {
      setPlaceholderText("No tags found with this configuration");
      setErrorMessage("No Azure Projects have been found associated with this Azure Tool Registry Account");
    }
  };

  if (!dataObject?.getData("isRollback")) {
    return null;
  }

  const getInfoText = () => {
    if (dataObject.getData("ecrPushStepId").length > 0) {
      return (
        <small>
          <FontAwesomeIcon icon={faSync} className="pr-1" />
          Click here to fetch Repository Tags
        </small>
      );
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={"octopusVersion"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        placeholderText={placeholderText}
        selectOptions={repoTags}
        textField={"name"}
        valueField={"name"}
        busy={isLoading}
        disabled={disabled || isLoading || repoTags == null || repoTags.length === 0}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AzureAcrPushRepositoryTagsSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

AzureAcrPushRepositoryTagsSelectInput.defaultProps = {
  disabled: false,
};

export default AzureAcrPushRepositoryTagsSelectInput;
