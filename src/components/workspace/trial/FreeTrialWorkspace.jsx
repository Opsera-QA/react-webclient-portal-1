import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";
import useHeaderNavigationBarReference from "hooks/useHeaderNavigationBarReference";
import FreeTrialLandingHeaderNavigationBar from "components/trial/landing/FreeTrialLandingHeaderNavigationBar";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { freeTrialWorkspaceActions } from "components/workspace/trial/freeTrialWorkspace.actions";

export default function FreeTrialWorkspace() {
  useHeaderNavigationBarReference(<FreeTrialLandingHeaderNavigationBar currentScreen={"workspace"} />);
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new FreeTrialWorkspaceFilterModel());
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    const response = await freeTrialWorkspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      newWorkspaceFilterModel?.getFilterValue("type"),
      newWorkspaceFilterModel?.getFilterValue("search"),
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setWorkspaceItems([...items]);
      newWorkspaceFilterModel.updateActiveFilters();
      setWorkspaceFilterModel({...newWorkspaceFilterModel});
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
    >
      <FreeTrialWorkspaceViewContainer
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={workspaceItems}
      />
    </ScreenContainer>
  );
}
