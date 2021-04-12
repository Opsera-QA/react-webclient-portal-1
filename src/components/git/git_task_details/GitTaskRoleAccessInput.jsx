import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {AuthContext} from "contexts/AuthContext";
import gitTasksActions from "components/git/git-task-actions";
import axios from "axios";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function GitTaskRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
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

    // TODO: Change to git tasks method when wired up
    setCanEditRoles(workflowAuthorizedActions.toolRegistryItems(accessRoleData, "edit_access_roles", owner, objectRoles));
  };

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    const response = await gitTasksActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newDataObject);

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

  if (canEditRoles == null) {
    return null;
  }

  return (
    <>
      <RoleAccessInlineInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        disabled={canEditRoles !== true || disabled}
        saveData={saveData}
        noDataMessage={getNoDataMessage()}
        visible={visible}
      />
      <div>
        <div><b>Access Rule Legend</b></div>
        <div><b>Everyone</b> has full access if no access rules are set.</div>
        <div><b>Owners</b> and <b>Administrators</b> have full access.</div>
        <div><b>Managers</b> can edit settings and run or stop tasks.</div>
        <div><b>Users</b> can run and stop tasks.</div>
        <div><b>Guests</b> have read only access.</div>
      </div>
    </>
  );
}

GitTaskRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

GitTaskRoleAccessInput.defaultProps = {
  fieldName: "roles"
};

export default GitTaskRoleAccessInput;