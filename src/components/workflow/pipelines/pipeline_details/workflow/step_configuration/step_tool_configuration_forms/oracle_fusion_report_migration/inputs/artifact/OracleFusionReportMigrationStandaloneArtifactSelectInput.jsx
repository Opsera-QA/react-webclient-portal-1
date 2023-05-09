import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import nexusStepActions 
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nexus/nexus-step-actions";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

const OracleFusionReportMigrationStandaloneArtifactSelectInput = ({ value,  disabled, setDataFunction, toolId, repositoryName, groupName }) => {
  
  const [artifacts, setArtifacts] = useState([]);
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
    if (!disabled && hasStringValue(toolId) && hasStringValue(repositoryName) && hasStringValue(groupName)) {
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
  }, [toolId, repositoryName, groupName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);      
      await loadArtifacts(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadArtifacts = async (cancelSource = cancelTokenSource) => {
    const response = await nexusStepActions.getNexusRepositoryArtifacts(getAccessToken, cancelSource, toolId, repositoryName, groupName);
    if(Array.isArray(response?.data?.data)){
      setArtifacts(response?.data?.data);
    }
  };

  return (
    <StandaloneSelectInput
      selectOptions={artifacts}
      value={value}
      busy={isLoading}
      placeholderText="Select Artifact"
      setDataFunction={(data) => setDataFunction(data)}
    />
  );
};

OracleFusionReportMigrationStandaloneArtifactSelectInput.propTypes = {
  toolId: PropTypes.string,
  repositoryName: PropTypes.string,
  groupName: PropTypes.string,
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default OracleFusionReportMigrationStandaloneArtifactSelectInput;
