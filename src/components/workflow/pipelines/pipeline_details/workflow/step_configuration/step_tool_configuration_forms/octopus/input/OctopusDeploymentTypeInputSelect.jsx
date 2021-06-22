import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import {AuthContext} from "contexts/AuthContext";

function OctopusDeploymentTypeSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled, textField, valueField, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [deploymentType, setOctopusDeploymentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Deployment Type");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    setOctopusDeploymentTypes([]);
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
      await loadTypes(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholder("Error Pulling Deployment Types");
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTypes = async (cancelSource = cancelTokenSource) => {
    const response = await OctopusStepActions.getDeploymentTypesV2(getAccessToken, cancelSource, dataObject.getData("octopusToolId"), dataObject.getData("spaceId"), dataObject.getData("octopusPlatformType"));
    const data = response?.data;

    if (isMounted?.current === true && Array.isArray(data)) {
      setOctopusDeploymentTypes(data);
    }
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={deploymentType}
      busy={isLoading}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading}
    />
  );
}

OctopusDeploymentTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  className: PropTypes.string
};

OctopusDeploymentTypeSelectInput.defaultProps = {
  valueField: "deploymentType",
  textField: "name"
};

export default OctopusDeploymentTypeSelectInput;