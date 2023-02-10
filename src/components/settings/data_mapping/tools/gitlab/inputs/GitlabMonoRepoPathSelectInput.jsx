import React, {useEffect, useRef, useState, useContext} from 'react';
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import axios from "axios";

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
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [monoRepoPaths, setMonoRepoPaths] = useState([]);
  const [error, setError] = useState(undefined);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    repoId ? loadData().catch((error) => {
      setError(error);
      if (isMounted?.current === true) {
        throw error;
      }
    }): null;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [repoId]);

  const loadData = async () => {
      setIsLoading(true);
      setMonoRepoPaths([]);
  
      const monoRepoPaths = await dataMappingActions.getMonoRepoPaths(getAccessToken, cancelTokenSource, repoId);
  
      setMonoRepoPaths(monoRepoPaths);
      setIsLoading(false);
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
