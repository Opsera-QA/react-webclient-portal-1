import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import nexusStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nexus/nexus-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const REPOSITORY_FORMAT = "maven2";

function OracleFusionReportMigrationNexusRepoSelectInput({visible, model, setModel, disabled, nexusToolConfigId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [nexusRepositoriesList, setNexusRepositoriesList] = useState([]);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setNexusRepositoriesList([]);
    if (nexusToolConfigId != null && nexusToolConfigId !== "") {
      loadRepos(nexusToolConfigId, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
    }
    
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [nexusToolConfigId]);

  const loadRepos = async (nexusToolConfigId, cancelSource = cancelTokenSource) => {
    try{
      setIsLoading(true);
      const response = await nexusStepActions.getNexusRepositoriesListV2(nexusToolConfigId, getAccessToken, cancelSource);
      if (response.data && response.data.data) {
        let nexusRepositories = [];
        if (response.data.data.length === 0) {
          nexusRepositories.push({
            name: "Configure nexus repositories to activate this step",
            format: "N/A",
            isDisabled: "yes",
          });
        }
        else {
          response.data.data.map((item) => {
            nexusRepositories.push({
              name: item.name,
              format: item.format,
              type: item.type,
              url: item.url,
              attributes: item.attributes,
            });
          });
        }        
        setNexusRepositoriesList(nexusRepositories.filter(repo => repo.format === REPOSITORY_FORMAT));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
      }
    } finally {
        if (isMounted?.current === true) {
          setIsLoading(false);
        }
    }
    
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Repositories";
    }

    if (nexusToolConfigId === "") {
      return "A Nexus Tool must be selected before selecting Repos";
    }

    if (!isLoading && nexusToolConfigId !== "" && nexusRepositoriesList.length === 0) {
      return "No Repositories found for selected configuration.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"repositoryName"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={nexusRepositoriesList}
      busy={isLoading}
      valueField="name"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || nexusToolConfigId === "" || nexusRepositoriesList.length === 0}
    />
  );
}

OracleFusionReportMigrationNexusRepoSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,  
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

OracleFusionReportMigrationNexusRepoSelectInput.defaultProps = {
  visible: true
};

export default OracleFusionReportMigrationNexusRepoSelectInput;
