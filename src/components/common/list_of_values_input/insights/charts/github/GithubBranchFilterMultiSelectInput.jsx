import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import githubAction from "../../../../../insights/charts/github/github.action";

// This is used for gitlab kpis
function GithubBranchFilterMultiSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
  repository
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setBranches([]);
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
  }, [repository]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadBranches(cancelSource);
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

  const loadBranches = async (cancelSource = cancelTokenSource) => {
    const response = await githubAction.githubBranchList(
      getAccessToken,
      cancelSource,
      repository
    );
    if (response?.data != null) {
      setBranches(response?.data?.data?.githubBranchList?.data);
    }
  };
  const disabled = !repository || repository.length === 0;
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={branches}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      pluralTopic={"Filters"}
    />
  );
}

GithubBranchFilterMultiSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  project: PropTypes.array,
  repository: PropTypes.string
};

GithubBranchFilterMultiSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default GithubBranchFilterMultiSelectInput;
