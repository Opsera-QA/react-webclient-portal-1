import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { awsActions } from "components/common/list_of_values_input/tools/aws/aws.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function ArgoCdStepAwsRepositoryTagSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    valueField,
    textField,
    awsToolConfigId,
    repoName,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [repositoryTags, setRepositoryTags] = useState([]);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setError(undefined);
    setRepositoryTags([]);
    if (isMongoDbId(awsToolConfigId) === true && hasStringValue(repoName)) {
      loadData(source).catch((error) => {
        throw error;
      });
    }    

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [awsToolConfigId, repoName]);

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

    const response = await awsActions.getEcrTags(
      getAccessToken,
      cancelSource,
      awsToolConfigId,
      repoName,
    );
    const repositoryTags = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositoryTags)) {
      setRepositoryTags([...repositoryTags]);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    if (newModel?.getData("kustomizeFlag") === true) {
      newModel.setData("imageUrl", selectedOption?.value);
    }
    setModel({ ...newModel });
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={repositoryTags}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      setDataFunction={setDataFunction}
      singularTopic={"Repository Tag"}
      pluralTopic={"Repository Tags"}
      error={error}
    />
  );
}

ArgoCdStepAwsRepositoryTagSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  awsToolConfigId: PropTypes.string,
  repoName: PropTypes.string,
};

ArgoCdStepAwsRepositoryTagSelectInput.defaultProps = {
  valueField: "value",
  textField: "name",
  fieldName: "repositoryTag",
};

export default ArgoCdStepAwsRepositoryTagSelectInput;