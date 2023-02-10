import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function GitlabMonoRepoPathSelectInput({
  fieldName,
  model, 
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  repoId,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [monoRepoPaths, setMonoRepoPaths] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setMonoRepoPaths([]);
    if (hasStringValue(repoId) === true) {
      loadData().catch((error) => {
        setError(error);
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [repoId]);

  const loadData = async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadMonoRepoPaths();
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadMonoRepoPaths = async () => {
    const response = await dataMappingActions.getMonoRepoPaths(getAccessToken, cancelTokenSource, repoId);
    console.log("response: " + JSON.stringify(response));
    setMonoRepoPaths(monoRepoPaths);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={monoRepoPaths}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Mono Repo Path"}
      pluralTopic={"Mono Repo Paths"}
      error={error}
      busy={isLoading}
      loadDataFunction={loadData}
    />
  );
}

GitlabMonoRepoPathSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  repoId: PropTypes.string,
};
