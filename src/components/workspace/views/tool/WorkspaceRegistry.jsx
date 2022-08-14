import React, {useContext, useEffect, useRef, useState} from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkspaceRegistryViews from "components/workspace/views/tool/WorkspaceRegistryViews";

export default function WorkspaceRegistry(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [toolMetadata, setToolMetadata] = useState(undefined);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getToolRegistryList();
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

  const getToolRegistryList = async () => {
    const response = await toolsActions.getWorkspaceToolRegistryList(getAccessToken, cancelTokenSource);
    const newTools = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newTools)) {
      const metadata = response?.data?.metadata;
      setToolMetadata({...metadata});
      setTools([...newTools]);
    }
  };

  return (
    <WorkspaceRegistryViews
      isLoading={isLoading}
      loadData={loadData}
      tools={tools}
      toolMetadata={toolMetadata}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
    />
  );
}

WorkspaceRegistry.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};