import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import jiraAction from "../../../../../insights/charts/jira/jira.action";

function JiraPrioritiesSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
  setDataFunction,
  disabled,
}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [priorities, setPriorities] = useState([]);
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
    loadData().catch((error) => {
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
      await loadPriorities(cancelSource);
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

  const loadPriorities = async (cancelSource = cancelTokenSource) => {
    const response = await jiraAction.getJiraPriorities(
      getAccessToken,
      cancelSource,
    );
    if (response.data != null) {
      setPriorities(response?.data?.data?.jiraPrioritiesList?.data);
    }
  };
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={priorities}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      pluralTopic={"Priorities"}
    />
  );
}

JiraPrioritiesSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

JiraPrioritiesSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default JiraPrioritiesSelectInput;
