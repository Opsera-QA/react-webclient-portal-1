import React from "react";
import { SecureRoute } from "@okta/okta-react";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";

export default function WorkspaceRoutes() {
  return (
    <>
      <SecureRoute
        path={"/workspace"}
        exact
        component={FreeTrialWorkspace}
      />
    </>
  );
}

WorkspaceRoutes.propTypes = {};

