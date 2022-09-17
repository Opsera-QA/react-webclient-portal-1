import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { useParams } from "react-router-dom";
import { workspaceActions } from "components/workspace/workspace.actions";

export default function FreeTrialCustomerWorkspaceView() {
  const { userId } = useParams();
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
    const response = await workspaceActions.getFreeTrialCustomerWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      userId,
      newWorkspaceFilterModel?.getFilterValue("search"),
    );
    const users = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(users)) {
      setToolMetadata(response?.data?.toolMetadata);
      setTaskMetadata(response?.data?.taskMetadata);
      setWorkspaceItems([...users]);
      newWorkspaceFilterModel.updateActiveFilters();
      setWorkspaceFilterModel({...newWorkspaceFilterModel});
    }
  };

  return (
    <ScreenContainer
      className={"mt-3"}
      breadcrumbDestination={"workspace"}
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
