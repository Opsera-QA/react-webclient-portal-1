import React from "react";

function GitRoleAccessHelpDocumentation() {
  return (
    <div>
      <div className={"mb-2"}>
        Access Rules define who has privileges to interact with a resource.
        Individual users or groups can be used to grant the access.
      </div>
      <div><b>Access Rule Legend</b></div>
      <div><b>Everyone</b> has edit and run or stop access, if no access rules are set.</div>
      <div><b>Owners</b> and <b>Administrators</b> have full access and can delete tasks.</div>
      <div><b>Managers</b> can edit settings and run or stop tasks.</div>
      <div><b>Users</b> can run and stop tasks.</div>
      <div><b>Guests</b> have read only access.</div>
    </div>
  );
}

export default React.memo(GitRoleAccessHelpDocumentation);