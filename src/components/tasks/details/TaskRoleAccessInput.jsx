import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {AuthContext} from "contexts/AuthContext";
import taskActions from "components/tasks/task.actions";
import axios from "axios";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import GitRoleAccessHelpDocumentation
  from "components/common/help/documentation/tasks/GitRoleAccessHelpDocumentation";

function TaskRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken, getAccessRoleData, isSassUser } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [canEditRoles, setCanEditRoles] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    const owner = dataObject?.getData("owner");
    const objectRoles = dataObject?.getData("roles");
    const accessRoleData = await getAccessRoleData();

    setCanEditRoles(workflowAuthorizedActions.gitItems(accessRoleData, "edit_access_roles", owner, objectRoles));
  };

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    const response = await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newDataObject);

    if(isMounted?.current === true) {
      setDataObject({...newDataObject});
    }

    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Access Rules are currently applied. All users can see or edit this {dataObject?.getType()}.</span>
    );
  };

  if (canEditRoles == null || isSassUser()) {
    return null;
  }

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={dataObject}
      disabled={canEditRoles !== true || disabled}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
      visible={visible}
      helpComponent={<GitRoleAccessHelpDocumentation />}
    />
  );
}

TaskRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

TaskRoleAccessInput.defaultProps = {
  fieldName: "roles"
};

export default TaskRoleAccessInput;