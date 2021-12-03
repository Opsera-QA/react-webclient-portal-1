import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const OctopusStandaloneVariablesTypeSelectInput = ({ dataObject, value,  disabled, setDataFunction }) => {
  
  const [variableTypes, setVariableTypes] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);      
      await loadVariableTypes(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadVariableTypes = async (cancelSource = cancelTokenSource) => {
    const response = await OctopusStepActions.getVariableTypes(getAccessToken, cancelSource, dataObject.getData("octopusToolId"), dataObject.getData("spaceId"), dataObject.getData("octopusDeploymentType") || "defualt");
    const variableTypes = response?.data?.data;
    if(Array.isArray(variableTypes)){
      setVariableTypes(variableTypes);
    }
  };

  return (
    <StandaloneSelectInput
      selectOptions={variableTypes}
      value={value}
      busy={isLoading}
      placeholderText="Select Variable Type"
      setDataFunction={(data) => setDataFunction(data)}
    />
  );
};

OctopusStandaloneVariablesTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default OctopusStandaloneVariablesTypeSelectInput;