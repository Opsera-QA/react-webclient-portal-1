import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import OctopusStepActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
  import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";

const OctopusStandaloneEnvironmentsMultiSelectInput = ({ dataObject, value,  disabled, setDataFunction }) => {
  
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [octopusEnvironments, setOctopusEnvironments] = useState([]);

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
      await loadEnvironments(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadEnvironments = async (cancelSource = cancelTokenSource) => {
    const response = await OctopusStepActions.getEnvironmentsV2(getAccessToken, cancelSource, dataObject.getData("octopusToolId"), dataObject.getData("spaceId"));
    const environments = response?.data?.data;
    if (Array.isArray(environments)) {
      setOctopusEnvironments(environments);
    }
  };

  return (    
    <StandaloneMultiSelectInput      
      selectOptions={octopusEnvironments}
      valueField={"_id"}
      textField={"name"}
      busy={isLoading}
      value={value}
      placeholderText="Select Environments"
      disabled={disabled}
      setDataFunction={(data) => setDataFunction(data)}
    />
  );
};

OctopusStandaloneEnvironmentsMultiSelectInput.propTypes = {
  dataObject: PropTypes.object,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default OctopusStandaloneEnvironmentsMultiSelectInput;