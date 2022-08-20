import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/header/FreeTrialLandingHeaderNavigationBar";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";

export default function FreeTrialWorkspace() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new FreeTrialWorkspaceFilterModel());
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toolMetadata, setToolMetadata] = useState(undefined);
  const [taskMetadata, setTaskMetadata] = useState(undefined);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setWorkspaceItems([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newWorkspaceFilterModel = workspaceFilterModel) => {
    try {
      setWorkspaceItems([]);
      setIsLoading(true);
      await getWorkspaceItems(newWorkspaceFilterModel);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getWorkspaceItems = async (newWorkspaceFilterModel = workspaceFilterModel) => {
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      newWorkspaceFilterModel?.getFilterValue("type"),
      newWorkspaceFilterModel?.getFilterValue("search"),
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setToolMetadata(response?.data?.toolMetadata);
      setTaskMetadata(response?.data?.taskMetadata);
      setWorkspaceItems([...items]);
      setWorkspaceFilterModel({...newWorkspaceFilterModel});
    }
  };

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
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
        loadData={loadData}
        taskMetadata={taskMetadata}
        toolMetadata={toolMetadata}
        isLoading={isLoading}
        workspaceItems={workspaceItems}
      />
    </ScreenContainer>
  );
}
