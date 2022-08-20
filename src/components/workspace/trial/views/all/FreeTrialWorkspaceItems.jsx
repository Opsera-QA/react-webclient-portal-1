import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialWorkspaceItemViews from "components/workspace/trial/views/all/FreeTrialWorkspaceItemViews";

export default function FreeTrialWorkspaceItems(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getWorkspaceItems();
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

  const getWorkspaceItems = async () => {
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      workspaceFilterModel?.getFilterValue("type"),
      workspaceFilterModel?.getFilterValue("search"),
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setToolMetadata(response?.data?.toolMetadata);
      setTaskMetadata(response?.data?.taskMetadata);
      setWorkspaceItems([...items]);
    }
  };

  return (
    <FreeTrialWorkspaceItemViews
      workspaceItems={workspaceItems}
      isLoading={isLoading}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
      loadData={loadData}
      taskMetadata={taskMetadata}
      toolMetadata={toolMetadata}
    />
  );
}

FreeTrialWorkspaceItems.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};