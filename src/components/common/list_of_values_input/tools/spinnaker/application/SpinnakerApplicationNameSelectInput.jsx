import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import SpinnakerStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/spinnaker/spinnaker-step-actions";

function SpinnakerApplicationNameSelectInput({className, spinnakerToolId, fieldName, model, setModel, setDataFunction, disabled, clearDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [spinnakerApplications, setSpinnakerApplications] = useState([]);
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
  }, [spinnakerToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setSpinnakerApplications([]);

      if (spinnakerToolId != null && spinnakerToolId !== "") {
        await loadSpinnakerApplications(cancelSource);
      }
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadSpinnakerApplications = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await SpinnakerStepActions.getSpinnakerApplicationsV2(getAccessToken, cancelSource, spinnakerToolId);
      const applications = response?.data?.spinnakerApplications;

      if (Array.isArray(applications)) {
        setSpinnakerApplications(applications);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getPlaceholderText = () => {
    if (spinnakerToolId == null || spinnakerToolId === "") {
      return ("You must select a Spinnaker Tool before selecting an Application");
    }

    if (!isLoading && (spinnakerApplications == null || spinnakerApplications.length === 0)) {
      return ("Spinnaker Application information is missing or unavailable!");
    }

    return ("Select Spinnaker Application");
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      placeholderText={getPlaceholderText()}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={spinnakerApplications}
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
};

export default SpinnakerApplicationNameSelectInput;
