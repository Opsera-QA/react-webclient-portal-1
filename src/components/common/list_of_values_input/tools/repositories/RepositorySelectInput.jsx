import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import GitActionsHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";
  import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import AzureDevOpsRepositorySelectInput
  from "components/common/list_of_values_input/tools/azure/repositories/AzureDevOpsRepositorySelectInput";

// TODO: Clean up this component. Change "gitToolId" to "toolId", make validateSavedData default to true after all use cases are tested.
// TODO: Separate out into multiple inputs, make this RepositorySelectInputBase
function RepositorySelectInput(
  {
    service,
    gitToolId,
    workspace,
    visible,
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
    placeholderText,
    valueField,
    textField,

    // TODO: This will default to true in the future. So it only needs to be
    validateSavedData,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    console.log("service: " + service);
    if (hasStringValue(service) && service !== "azure-devops" && isMongoDbId(gitToolId)) {
      if(service === "bitbucket" && !hasStringValue(workspace)) {
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
    let repositories = response?.data?.data;

    if (Array.isArray(repositories)) {
      setRepositories(repositories);

      if (validateSavedData === true) {
        const existingRepository = dataObject?.getData(fieldName);

        if (existingRepository != null && existingRepository !== "") {
          const existingRepositoryExists = repositories.find((repository) => repository[valueField] === existingRepository);

          if (existingRepositoryExists == null) {
            setErrorMessage(
              "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list."
            );
          }
        }
      }
    }
  };

  if (visible === false) {
    return <></>;
  }

  const getPlaceholderText = () => {
    const requiredFieldsExist = service !== "" && gitToolId !== "";
    const bitbucketRequiredFieldsExist = service !== "bitbucket" || (workspace != null && workspace !== "");
    if (!isLoading && (!Array.isArray(repositories) || repositories.length === 0) && requiredFieldsExist && bitbucketRequiredFieldsExist) {
      return ("No Repositories Found!");
    }

    return (placeholderText);
  };

  if (service === "azure-devops") {
    return (
      <AzureDevOpsRepositorySelectInput
        toolId={gitToolId}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
        clearDataFunction={clearDataFunction}
      />
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={repositories}
      busy={isLoading}
      errorMessage={errorMessage}
      placeholderText={getPlaceholderText()}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled || isLoading || repositories.length === 0}
    />
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
  clearDataFunction: PropTypes.func,
  validateSavedData: PropTypes.bool,
  placeholderText: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

RepositorySelectInput.defaultProps = {
  placeholderText: "Select Repository",
  valueField: "name",
  textField: "name",
};

export default RepositorySelectInput;
