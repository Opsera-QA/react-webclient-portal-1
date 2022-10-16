import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import nexusStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nexus/nexus-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function DockerCliNexusRepoSelectInput({ model, setModel, disabled, nexusToolConfigId }) {
  const { getAccessToken } = useContext(AuthContext);
  const [nexusRepositoriesList, setNexusRepositoriesList] = useState([]);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Nexus Repository");

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
    try {
      setIsLoading(true);
      setPlaceholderText("Loading Nexus Repositories");
      const response = await nexusStepActions.getNexusRepositoriesListV2(nexusToolConfigId, getAccessToken, cancelSource);

      const repos = response?.data?.data;

      if (Array.isArray(repos) && repos.length > 0) {
        setNexusRepositoriesList(repos.filter(repo => repo.format === "docker"));
        setPlaceholderText("Select Nexus Repository");
      }

      if (repos?.length === 0) {
        setPlaceholderText("No Nexus Repositories found");
      }

    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("There was an error pulling Nexus Repositories!");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }

  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = model;
    newDataObject.setData("repositoryGroup", selectedOption.format);
    newDataObject.setData("repositoryName", selectedOption.name);
    setModel({ ...newDataObject });
  };

  const clearDataFunction = (fieldName) => {
    let newDataObject = model;
    newDataObject.setData("repositoryGroup", "");
    newDataObject.setData("repositoryName", "");
    setModel({ ...newDataObject });
  };

  return (
    <SelectInputBase
      fieldName={"repositoryName"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={nexusRepositoriesList}
      busy={isLoading}
      valueField="name"
      textField="name"
      placeholderText={placeholder}
      disabled={disabled || isLoading || nexusToolConfigId === "" || nexusRepositoriesList.length === 0}
      error={errorMessage}
    />
  );
}

DockerCliNexusRepoSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default DockerCliNexusRepoSelectInput;
