import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import SpinnakerStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/spinnaker/spinnaker-step-actions";

function SpinnakerApplicationNameSelectInput({className, spinnakerToolId, spinnakerApplicationName, fieldName, model, setModel, setDataFunction, disabled, clearDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [spinnakerTools, setSpinnakerTools] = useState([]);
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
  }, [spinnakerToolId, spinnakerApplicationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setSpinnakerTools([]);

      if (spinnakerToolId != null && spinnakerToolId !== "" && spinnakerApplicationName != null && spinnakerApplicationName !== "") {
        await loadSpinnakerTools(cancelSource);
      }
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadSpinnakerTools = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await SpinnakerStepActions.getSpinnakerToolsV2(getAccessToken, cancelSource, spinnakerToolId, spinnakerApplicationName);
      const pipelines = response?.data?.spinnakerPipelines;

      if (Array.isArray(pipelines)) {
        setSpinnakerTools(pipelines);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (spinnakerTools == null || spinnakerTools.length === 0)) {
      return ("Spinnaker Tool information is missing or unavailable!");
    }

    return ("Select Spinnaker Tool");
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      placeholderText={getPlaceholderText()}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={spinnakerTools}
      clearDataFunction={clearDataFunction}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
      className={className}
    />
  );
}

SpinnakerApplicationNameSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  spinnakerToolId: PropTypes.string,
  spinnakerApplicationName: PropTypes.string,
};

export default SpinnakerApplicationNameSelectInput;
