import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Workspace from "components/workspace/views/Workspace";

export default function WorkspaceRoutes() {
  return (
    <>
      <SecureRoute
        path={"/workspace"}
        exact
        component={Workspace}
      />
    </>
  );
}

WorkspaceRoutes.propTypes = {};

