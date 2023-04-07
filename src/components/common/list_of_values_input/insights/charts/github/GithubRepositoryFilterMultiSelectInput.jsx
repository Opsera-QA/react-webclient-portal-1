import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import githubAction from "../../../../../insights/charts/github/github.action";

// This is used for gitlab kpis
function GithubRepositoryFilterMultiSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setRepositories([]);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadRepositories(cancelSource);
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

  const loadRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await githubAction.githubRepositoryList(
      getAccessToken,
      cancelSource,
    );
    if (response.data != null) {
      setRepositories(response?.data?.data);
    }
  };
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={repositories}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
    />
  );
}

GithubRepositoryFilterMultiSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  project: PropTypes.array,
};

GithubRepositoryFilterMultiSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default GithubRepositoryFilterMultiSelectInput;
