import React from "react";
import RoleAccessEditorHelpOverlayContainer from "components/common/help/input/role_access_editor/RoleAccessEditorHelpOverlayContainer";

function GitRoleAccessHelpDocumentation() {
  return (
    <RoleAccessEditorHelpOverlayContainer>

      <div><b>Owners</b> and <b>Administrators</b> have full editing capabilities.</div>
      <div><b>Managers</b> and <b>SecOps</b> roles can view or edit tool.</div>
      <div><b>Guests</b> have read-only access.</div>
      <div><b>Users</b> can only use resource.</div>
      <div>If no <b>Access Rules</b> are applied, <b>all</b> users can view or edit the tool.</div>

    </RoleAccessEditorHelpOverlayContainer>
  );
}

export default React.memo(GitRoleAccessHelpDocumentation);