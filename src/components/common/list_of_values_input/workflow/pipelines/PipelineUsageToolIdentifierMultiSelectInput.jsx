import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {toolIdentifierActions} from "components/admin/tools/identifiers/toolIdentifier.actions";
import IconBase from "components/common/icons/IconBase";

function PipelineUsageToolIdentifierMultiSelectInput(
  {
    valueField,
    textField,
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

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
      setError(undefined);
      await loadToolIdentifiers(cancelSource);
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

  const loadToolIdentifiers = async (cancelSource = cancelTokenSource) => {
    const response = await toolIdentifierActions.getPipelineUsageToolIdentifiersV2(getAccessToken, cancelSource);
    const toolIdentifiers  = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(toolIdentifiers)) {
      setToolIdentifiers(toolIdentifiers);
    }
  };

  if (!isLoading && (toolIdentifiers == null || toolIdentifiers.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
        No tool identifiers are active and registered for Pipeline use.
      </div>
    );
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      error={error}
      disabled={disabled}
    />
  );
}

PipelineUsageToolIdentifierMultiSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

PipelineUsageToolIdentifierMultiSelectInput.defaultProps = {
  textField: "name",
  valueField: "identifier"
};

export default PipelineUsageToolIdentifierMultiSelectInput;