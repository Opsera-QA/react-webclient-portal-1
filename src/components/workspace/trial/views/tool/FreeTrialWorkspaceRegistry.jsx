import React, {useEffect, useState} from "react";
import toolsActions from "components/inventory/tools/tools-actions";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialWorkspaceRegistryViews from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryViews";

export default function FreeTrialWorkspaceRegistry(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [toolMetadata, setToolMetadata] = useState(undefined);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
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
    <FreeTrialWorkspaceRegistryViews
      isLoading={isLoading}
      loadData={loadData}
      tools={tools}
      toolMetadata={toolMetadata}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
    />
  );
}

FreeTrialWorkspaceRegistry.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};