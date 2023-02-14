import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import taskActions from "components/tasks/task.actions";
import GitRoleAccessHelpDocumentation
  from "components/common/help/documentation/tasks/GitRoleAccessHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import {taskHelper} from "components/tasks/task.helper";

function TaskRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const [canEditRoles, setCanEditRoles] = useState(undefined);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    isSassUser,
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    // TODO: Wire up through the model when ready
    setCanEditRoles(TaskRoleHelper.canEditAccessRoles(userData, dataObject?.getCurrentData()));
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

  if (canEditRoles == null || isSassUser !== false) {
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
      lostAccessRerouteRoute={taskHelper.getManagementScreenLink()}
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