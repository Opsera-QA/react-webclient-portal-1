import React, { useContext } from "react";
import FreeTrialWorkspaceVerticalTabContainer from "components/workspace/trial/views/FreeTrialWorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import CreatePipelineWizard from "components/wizard/free_trial/pipeline/CreatePipelineWizard";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import FreeTrialWorkspacePipelineViews from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelineViews";
import FreeTrialWorkspaceRegistryViews from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryViews";
import FreeTrialWorkspaceTaskViews from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskViews";
import FreeTrialWorkspaceItemViews from "components/workspace/trial/views/all/FreeTrialWorkspaceItemViews";

export default function FreeTrialWorkspaceViewContainer(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    workspaceItems,
    toolMetadata,
    taskMetadata,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);

  const getCurrentView = () => {
    switch (workspaceFilterModel?.getData("type")) {
      case "pipelines":
        return (
          <FreeTrialWorkspacePipelineViews
            pipelines={workspaceItems}
            isLoading={isLoading}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
            loadData={loadData}
          />
        );
      case "registry":
        return (
          <FreeTrialWorkspaceRegistryViews
            isLoading={isLoading}
            loadData={loadData}
            tools={workspaceItems}
            toolMetadata={toolMetadata}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "tasks":
        return (
          <FreeTrialWorkspaceTaskViews
            tasks={workspaceItems}
            loadData={loadData}
            isLoading={isLoading}
            taskMetadata={taskMetadata}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "all":
      default:
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
  };

  const getVerticalTabContainer = () => {
    return (
      <FreeTrialWorkspaceVerticalTabContainer
        workspaceFilterModel={workspaceFilterModel}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const getTabAndViewContainer = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getCurrentView()}
        tabColumnSize={2}
        // bodyClassName={bodyClassName}
        // minimumHeight={minimumHeight}
        // maximumHeight={maximumHeight}
        // overflowXBodyStyle={overflowXBodyStyle}
        // overflowYContainerStyle={overflowYContainerStyle}
        // overflowYBodyStyle={overflowYBodyStyle}
      />
    );
  };

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreatePipelineWizard />
    );
  };

  return (
    <FilterContainer
      addRecordFunction={createWorkspaceItem}
      body={getTabAndViewContainer()}
      titleIcon={faRectangleList}
      filterDto={workspaceFilterModel}
      setFilterDto={setWorkspaceFilterModel}
      supportViewToggle={true}
      isLoading={isLoading}
      title={"Workspace"}
      type={"Workspace Item"}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialWorkspaceViewContainer.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  workspaceItems: PropTypes.array,
  toolMetadata: PropTypes.object,
  taskMetadata: PropTypes.object,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};