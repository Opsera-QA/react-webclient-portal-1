import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {hasStringValue} from "components/common/helpers/string-helpers";
import argoCdStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/argo_cd/argocd-step-actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function ArgoCdRepositoryTagSelectInputBase(
  {
    fieldName,
    model,
    setModel,
    pipelineId,
    stepId,
    toolIdentifier,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
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

    if (isMongoDbId(stepId) === true && isMongoDbId(pipelineId) === true && hasStringValue(toolIdentifier) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [stepId]);

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
    const response = await argoCdStepActions.getArtifactoryTagsFromArgoInstance(getAccessToken, cancelSource, pipelineId, stepId, toolIdentifier);
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

ArgoCdRepositoryTagSelectInputBase.propTypes = {
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
};

ArgoCdRepositoryTagSelectInputBase.defaultProps = {
  valueField: "value",
  textField: "name",
};

export default ArgoCdRepositoryTagSelectInputBase;
