import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {argoCdActions} from "components/common/list_of_values_input/tools/argo_cd/argocd.actions";

function ArgoCdRepositoryAzureTagSelectInput(
  {
    fieldName,
    model,
    setModel,
    pipelineId,
    stepId,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
    plan,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [repositoryTags, setRepositoryTags] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setError(undefined);
    setRepositoryTags([]);

    if (isMongoDbId(stepId) === true && isMongoDbId(pipelineId) === true && plan) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [stepId, pipelineId, plan]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadRepositoryTags(cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRepositoryTags = async (cancelSource = cancelTokenSource) => {

    const azureStep = plan.find((step) => step._id === stepId);

    if (azureStep == null) {
      return;
    }

    const azureToolConfigId = azureStep?.tool?.configuration?.azureToolConfigId;
    const acrLoginUrl = azureStep?.tool?.configuration?.acrLoginUrl;
    const acrRepoName = azureStep?.tool?.configuration?.azureRepoName;
    const response = await argoCdActions.getAzureArtifactoryTagsFromArgoInstance(
      getAccessToken,
      cancelSource,
      azureToolConfigId,
      acrLoginUrl,
      acrRepoName,
      );
    const repositoryTags = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositoryTags)) {
      setRepositoryTags([...repositoryTags]);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={repositoryTags}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Argo CD Repository Tag"}
      pluralTopic={"Argo CD Repository Tags"}
      error={error}
    />
  );
}

ArgoCdRepositoryAzureTagSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  stepId: PropTypes.string.isRequired,
  pipelineId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  toolIdentifier: PropTypes.string,
  plan: PropTypes.array,
};

ArgoCdRepositoryAzureTagSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default ArgoCdRepositoryAzureTagSelectInput;
