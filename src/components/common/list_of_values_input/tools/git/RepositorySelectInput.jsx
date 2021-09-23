import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import GitActionsHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";
  import axios from "axios";

function RepositorySelectInput({ service, gitToolId, workspace, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setRepositories([]);
    if (service && service !== "" && gitToolId && gitToolId !== "") {
      if(service === "bitbucket" && (!workspace || workspace === "")) {
        setRepositories([]);
        return;
      }
      
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    
      return () => {
        source.cancel();
        isMounted.current = false;
      };
    }
  }, [service, gitToolId, workspace]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRepositories(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      if(isMounted?.current === true){
      setIsLoading(false);
      }
    }
  };

  const getRepositories = async (cancelSource = cancelTokenSource) => {
    const response  = await GitActionsHelper.searchRepositoriesV2(service, gitToolId, workspace, getAccessToken, cancelSource);
    let repositoriesResponse = response?.data?.data;

    if (Array.isArray(repositoriesResponse)) {
      setRepositories(repositoriesResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoRepositoriesMessage = () => {
    if (!isLoading && (repositories == null || repositories.length === 0) && service !== "" && gitToolId !== "") {
      return ("No Repositories Found!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={repositories}
        busy={isLoading}
        placeholderText={getNoRepositoriesMessage()}
        clearDataFunction={clearDataFunction}
        valueField="name"
        textField="name"
        disabled={disabled || isLoading || repositories.length === 0}
      />
    </div>
  );
}

RepositorySelectInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

RepositorySelectInput.defaultProps = {
  visible: true,
  placeholderText: "Select Repository"
};

export default RepositorySelectInput;
