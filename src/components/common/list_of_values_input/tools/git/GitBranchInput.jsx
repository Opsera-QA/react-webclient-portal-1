import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import GitActionsHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";

// TODO: This needs to be reworked. We should not be using the /tools/properties routes
function GitBranchInput({ service, gitToolId, repoId, workspace, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
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
    if (hasStringValue(service) === true && hasStringValue(gitToolId) === true && hasStringValue(repoId) === true) {
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
    }
  };

  const getNoBranchesMessage = () => {
    if (!isLoading && (!Array.isArray(branches) || branches.length === 0) && hasStringValue(service) === true && hasStringValue(gitToolId) === true && hasStringValue(repoId) === true) {
      return ("No Branches Found!");
    }
  };

  if (visible === false) {
    return <></>;
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
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

export default GitBranchInput;
