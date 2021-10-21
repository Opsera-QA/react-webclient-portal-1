import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function OctopusEnvironmentSelectInput(
  {
    fieldName,
    model,
    className,
    setModel,
    disabled,
    formatDataFunction,
    textField,
    valueField,
    octopusToolId,
    spaceId,
    setDataFunction,
    clearDataFunction
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [octopusEnvironments, setOctopusEnvironments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Environment");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setOctopusEnvironments([]);

    if (octopusToolId !== null && octopusToolId !== "" && spaceId != null && spaceId !== "") {
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
  }, [octopusToolId, spaceId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadEnvironments(cancelSource);
    }
    catch (error) {
      setPlaceholder("Error Pulling Octopus Environments");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadEnvironments = async (cancelSource = cancelTokenSource) => {
    const response = await OctopusStepActions.getEnvironmentsV2(getAccessToken, cancelSource, octopusToolId, spaceId);
    const environments = response?.data?.data;

    if (Array.isArray(environments)) {
      setOctopusEnvironments(environments);
    }
  };

  return (
    <SelectInputBase
      className={className}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={octopusEnvironments}
      formatDataFunction={formatDataFunction}
      clearDataFunction={clearDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled}
    />
  );
}

OctopusEnvironmentSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  octopusToolId: PropTypes.string,
  spaceId: PropTypes.string,
  formatDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

OctopusEnvironmentSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusEnvironmentSelectInput;