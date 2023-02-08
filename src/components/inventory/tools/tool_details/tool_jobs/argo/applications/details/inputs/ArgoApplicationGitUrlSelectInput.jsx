import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";

function ArgoApplicationGitUrlSelectInput(
  {
    toolId,
    visible,
    fieldName,
    model,
    setModel,
    disabled,
    className,
  }) {
  const defaultSelection = { username: "*", repo: "*" };
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([defaultSelection]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(toolId) === true) {
      loadData(toolId, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (toolId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await loadRepositories(toolId, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadRepositories = async (toolId, cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoRepositories(getAccessToken, cancelSource, toolId);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories([defaultSelection, ...repositories]);
    }
  };

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={repositories}
        busy={isLoading}
        valueField={"repo"}
        textField={"repo"}
        disabled={disabled}
        error={error}
        visible={visible}
      />      
    </div>
  );
}

ArgoApplicationGitUrlSelectInput.propTypes = {
  toolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

export default ArgoApplicationGitUrlSelectInput;
