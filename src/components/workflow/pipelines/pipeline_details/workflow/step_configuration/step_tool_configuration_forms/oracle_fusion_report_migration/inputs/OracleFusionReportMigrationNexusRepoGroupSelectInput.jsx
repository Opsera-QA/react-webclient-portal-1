import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import nexusStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nexus/nexus-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function OracleFusionReportMigrationNexusRepoGroupSelectInput({visible, model, setModel, disabled, nexusToolConfigId, repositoryName}) {
  const { getAccessToken } = useContext(AuthContext);
  const [nexusGroupsList, setNexusGroupsList] = useState([]);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setNexusGroupsList([]);
    if (nexusToolConfigId != null && nexusToolConfigId !== "" && repositoryName != null && repositoryName !== "") {
      loadGroups(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    }
    
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [nexusToolConfigId, repositoryName]);

  const loadGroups = async (cancelSource = cancelTokenSource) => {
    try{
      setIsLoading(true);
      const response = await nexusStepActions.getNexusRepositoryGroups(getAccessToken, cancelSource, nexusToolConfigId, repositoryName);      
      if (Array.isArray(response?.data?.data)) {
        setNexusGroupsList(response?.data?.data);
      }      
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
        if (isMounted?.current === true) {
          setIsLoading(false);
        }
    }
    
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Repository Groups";
    }

    if (nexusToolConfigId === "") {
      return "A Nexus Tool must be selected before selecting Repo Group";
    }

    if (!isLoading && nexusToolConfigId !== "" && repositoryName !== "" && nexusGroupsList.length === 0) {
      return "No Repository Groups found for selected configuration.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"groupName"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={nexusGroupsList}
      busy={isLoading}
      valueField="name"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || nexusGroupsList.length === 0}
      error={error}
    />
  );
}

OracleFusionReportMigrationNexusRepoGroupSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,  
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  repositoryName: PropTypes.string,
};

OracleFusionReportMigrationNexusRepoGroupSelectInput.defaultProps = {
  visible: true
};

export default OracleFusionReportMigrationNexusRepoGroupSelectInput;
