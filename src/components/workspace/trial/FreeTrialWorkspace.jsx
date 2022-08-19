import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/header/FreeTrialLandingHeaderNavigationBar";

export default function FreeTrialWorkspace() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);

  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      pageDescription={`
        The Opsera Workspace allows you to register, track, and configure all of the tools, pipelines, and tasks available to your account in
        one centralized location.
      `}
      includeSubNavigationGap={false}
    >
      <FreeTrialWorkspaceViewContainer
      />
    </ScreenContainer>
  );
}
