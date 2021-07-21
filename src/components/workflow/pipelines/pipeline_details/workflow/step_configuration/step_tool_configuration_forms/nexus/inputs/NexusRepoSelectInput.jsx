import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import nexusStepActions from "../nexus-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function NexusRepoSelectInput({visible, dataObject, setDataObject, setDataFunction, disabled, nexusToolConfigId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [nexusRepositoriesList, setNexusRepositoriesList] = useState([]);
  const [fullNexusRepositoriesList, setFullNexusRepositoriesList] = useState([]);
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

  useEffect(() => {
    setNexusRepositoriesList(fullNexusRepositoriesList.filter(repo => repo.format === dataObject.getData("repositoryFormat")));
  }, [dataObject.getData("repositoryFormat")]);

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
        setFullNexusRepositoriesList(nexusRepositories);
        setNexusRepositoriesList(nexusRepositories.filter(repo => repo.format === dataObject.getData("repositoryFormat")));
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
      return "No Repositories found for selected Nexus account.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"repositoryName"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={nexusRepositoriesList}
      busy={isLoading}
      valueField="name"
      textField="name"
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || nexusToolConfigId === "" || nexusRepositoriesList.length === 0}
    />
  );
}

NexusRepoSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

NexusRepoSelectInput.defaultProps = {
  visible: true
};

export default NexusRepoSelectInput;
