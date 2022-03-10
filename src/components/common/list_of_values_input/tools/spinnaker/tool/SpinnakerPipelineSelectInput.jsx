import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import SpinnakerStepActions
  from "components/workflow/plan/step/spinnaker/spinnaker-step-actions";

function SpinnakerPipelineSelectInput({className, spinnakerToolId, spinnakerApplicationName, fieldName, model, setModel, setDataFunction, disabled, clearDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const [spinnakerTools, setSpinnakerTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");
    setSpinnakerTools([]);

    if (spinnakerToolId != null && spinnakerToolId !== "" && spinnakerApplicationName != null && spinnakerApplicationName !== "") {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [spinnakerToolId, spinnakerApplicationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSpinnakerTools(cancelSource);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error pulling Spinnaker Pipelines! Check browser logs for more details.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadSpinnakerTools = async (cancelSource = cancelTokenSource) => {
    const response = await SpinnakerStepActions.getSpinnakerToolsV2(getAccessToken, cancelSource, spinnakerToolId, spinnakerApplicationName);
    const pipelines = response?.data?.spinnakerPipelines;

    if (Array.isArray(pipelines)) {
      setSpinnakerTools(pipelines);
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (spinnakerTools == null || spinnakerTools.length === 0)) {
      return ("Spinnaker pipelines information is missing or unavailable!");
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
      errorMessage={errorMessage}
    />
  );
}

SpinnakerPipelineSelectInput.propTypes = {
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

export default SpinnakerPipelineSelectInput;
