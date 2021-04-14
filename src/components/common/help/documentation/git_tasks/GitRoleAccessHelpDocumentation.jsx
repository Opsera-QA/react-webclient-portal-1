import React from "react";
import RoleAccessEditorHelpOverlayContainer from "components/common/help/input/role_access_editor/RoleAccessEditorHelpOverlayContainer";

function GitRoleAccessHelpDocumentation() {
  return (
    <RoleAccessEditorHelpOverlayContainer>
      <div><b>Access Rule Legend</b></div>
      <div><b>Everyone</b> has edit and run or stop access, if no access rules are set.</div>
      <div><b>Owners</b> and <b>Administrators</b> have full access and can delete tasks.</div>
      <div><b>Managers</b> can edit settings and run or stop tasks.</div>
      <div><b>Users</b> can run and stop tasks.</div>
      <div><b>Guests</b> have read only access.</div>
    </RoleAccessEditorHelpOverlayContainer>
  );
}

export default React.memo(GitRoleAccessHelpDocumentation);