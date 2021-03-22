import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PipelineUsageToolMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/PipelineUsageToolMultiSelectInput";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";

function PipelineUsageToolSelectInput({ placeholderText, fieldName, dataObject, setDataObject, setDataFunction, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelineUsageTools, setPipelineUsageTools] = useState([]);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true)
      await loadTools(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getPipelineUsageToolListV2(getAccessToken, cancelSource);

    if (response?.data != null) {
      setPipelineUsageTools(response?.data);
    }
  };

  if (!isLoading && (pipelineUsageTools == null || pipelineUsageTools.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No tool identifiers are active and registered for Pipeline use.
      </div>
    )
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={pipelineUsageTools}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

PipelineUsageToolSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

PipelineUsageToolMultiSelectInput.defaultProps = {
  textField: "name",
  valueField: "identifier"
};

export default PipelineUsageToolSelectInput;