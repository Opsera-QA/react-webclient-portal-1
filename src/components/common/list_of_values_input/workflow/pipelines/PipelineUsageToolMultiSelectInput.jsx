import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolManagementActions from "components/admin/tools/tool-management-actions";

function PipelineUsageToolMultiSelectInput(
  {
    placeholderText,
    valueField,
    textField,
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  const isMounted = useRef(false);
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
      await loadTools(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolManagementActions.getPipelineUsageToolIdentifiersV2(getAccessToken, cancelSource);
    const toolIdentifiers  = response?.data;

    if (isMounted?.current === true && Array.isArray(toolIdentifiers)) {
      setToolIdentifiers(toolIdentifiers);
    }
  };

  if (!isLoading && (toolIdentifiers == null || toolIdentifiers.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
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
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

PipelineUsageToolMultiSelectInput.propTypes = {
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

PipelineUsageToolMultiSelectInput.defaultProps = {
  textField: "name",
  valueField: "identifier"
};

export default PipelineUsageToolMultiSelectInput;