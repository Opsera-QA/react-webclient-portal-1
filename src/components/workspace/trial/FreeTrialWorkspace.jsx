import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";

export default function FreeTrialWorkspace() {
  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      pageDescription={`
        The Opsera Workspace allows you to register, track, and configure all of the tools, pipelines, and tasks available to your account in
        one centralized location.
      `}
    >
      <FreeTrialWorkspaceViewContainer
      />
    </ScreenContainer>
  );
}
