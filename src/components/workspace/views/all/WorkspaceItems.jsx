import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import WorkspaceItemViews from "components/workspace/views/all/WorkspaceItemViews";

export default function WorkspaceItems(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
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
    const response = await workspaceActions.getWorkspaceItems(getAccessToken, cancelTokenSource);
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setWorkspaceItems([...items]);
    }
  };

  return (
    <WorkspaceItemViews
      pipelines={workspaceItems}
      isLoading={isLoading}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
      loadData={loadData}
    />
  );
}

WorkspaceItems.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};