import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkspaceViewContainer from "components/workspace/views/WorkspaceViewContainer";

export default function Workspace() {
  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      pageDescription={`
        The Opsera Workspace allows you to register, track, and configure all of the tools, pipelines, and tasks available to your account in
        one centralized location.
      `}
    >
      <WorkspaceViewContainer
      />
    </ScreenContainer>
  );
}
