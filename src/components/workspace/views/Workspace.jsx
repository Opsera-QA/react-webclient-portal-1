import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import WorkspaceViewContainer from "components/workspace/views/WorkspaceViewContainer";
import useGetWorkspaceItems from "hooks/workspace/useGetWorkspaceItems";

export default function Workspace() {
  // useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);
  const {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    error,
    loadData,
  } = useGetWorkspaceItems();

  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      error={error}
    >
      <WorkspaceViewContainer
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={workspaceItems}
      />
    </ScreenContainer>
  );
}
