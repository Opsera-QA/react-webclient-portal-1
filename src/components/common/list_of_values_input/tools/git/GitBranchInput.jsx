import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import GitActionsHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";

function GitBranchInput({ service, gitToolId, repoId, workspace, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBranches([]);
    if (service && service !== "" && gitToolId  && gitToolId !== "" && repoId && repoId !== "") {
      loadData();
    }
  }, [service, gitToolId, workspace, repoId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getGitBranches();
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const getGitBranches = async () => {
    const response  = await GitActionsHelper.searchBranches(service, gitToolId, repoId, workspace, getAccessToken);
    let branchesResponse = response?.data?.data;

    if (Array.isArray(branchesResponse)) {
      setBranches(branchesResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoBranchesMessage = () => {
    if (!isLoading && (branches == null || branches.length === 0) && service !== "" && gitToolId !== "" && repoId !== "") {
      return ("No Branches Found!");
    }
  };

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
      valueField="name"
      textField="name"
      disabled={disabled || isLoading || branches.length === 0}
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
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

GitBranchInput.defaultProps = {
  visible: true,
};

export default GitBranchInput;
