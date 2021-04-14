import React from "react";
import RoleAccessEditorHelpOverlayContainer from "components/common/help/input/role_access_editor/RoleAccessEditorHelpOverlayContainer";

function ToolRegistryRoleAccessHelpDocumentation() {
  return (
    <RoleAccessEditorHelpOverlayContainer>
      <div><b>Access Rule Legend</b></div>
      <div><b>Everyone</b> has edit access, if no access rules are set.</div>
      <div><b>Owners</b> and <b>Administrators</b> have full access.</div>
      <div><b>Managers</b> can edit settings.</div>
      <div><b>Guests</b> and <b>Guests</b> have read only access.</div>
    </RoleAccessEditorHelpOverlayContainer>
  );
}

export default React.memo(ToolRegistryRoleAccessHelpDocumentation);