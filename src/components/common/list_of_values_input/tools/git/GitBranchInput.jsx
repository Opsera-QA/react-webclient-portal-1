import React, {useContext, useEffect, useRef, useState} from "react";
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
import AzureDevOpsBranchSelectInput
  from "components/common/list_of_values_input/tools/azure/branches/AzureDevOpsBranchSelectInput";

// TODO: Rework this into multiple inputs, rename BranchSelectInputBase
function GitBranchInput({ service, gitToolId, repoId, workspace, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, setBranchList}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setBranches([]);
    // TODO: Add check for service type?
    if (hasStringValue(service) === true && service !== "azure-devops" && isMongoDbId(gitToolId) === true && hasStringValue(repoId) === true) {
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
  }, [service, gitToolId, workspace, repoId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getGitBranches(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const getGitBranches = async (cancelSource = cancelTokenSource) => {
    const response  = await GitActionsHelper.getBranchesV2(getAccessToken, cancelSource, service, gitToolId, repoId, workspace);
    let branchesResponse = response?.data?.data;

    if (Array.isArray(branchesResponse)) {
      setBranches(branchesResponse);
      if (setBranchList != null) {
        setBranchList(branchesResponse); 
      }
    }
  };

  const getNoBranchesMessage = () => {
    if (!isLoading && (branches == null || branches.length === 0) && service !== "" && gitToolId !== "" && repoId !== "") {
      return ("No Branches Found!");
    }
  };

  if (visible === false) {
    return <></>;
  }

  if (service === "azure-devops") {
    return (
      <AzureDevOpsBranchSelectInput
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
      selectOptions={branches}
      busy={isLoading}
      placeholderText={getNoBranchesMessage()}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
    />
  );
}

GitBranchInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  repoId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  setBranchList:PropTypes.func
};

export default GitBranchInput;
