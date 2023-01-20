import React, { useContext } from "react";
import FreeTrialWorkspaceVerticalTabContainer from "components/workspace/trial/views/FreeTrialWorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer, {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION,
} from "components/common/table/FilterContainer";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import FreeTrialWorkspacePipelineViews from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelineViews";
import FreeTrialWorkspaceRegistryViews from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryViews";
import FreeTrialWorkspaceTaskViews from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskViews";
import FreeTrialWorkspaceItemViews from "components/workspace/trial/views/all/FreeTrialWorkspaceItemViews";
import InlineWorkspaceItemTypeFilter from "components/common/filters/workspace/type/InlineWorkspaceItemTypeFilter";
import { workspaceConstants } from "components/workspace/workspace.constants";

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
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <FreeTrialWorkspacePipelineViews
            pipelines={workspaceItems}
            isLoading={isLoading}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
            loadData={loadData}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL:
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
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
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
      case workspaceConstants.WORKSPACE_ITEM_TYPES.ALL:
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
        minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
        // maximumHeight={maximumHeight}
        // overflowXBodyStyle={overflowXBodyStyle}
        // overflowYContainerStyle={overflowYContainerStyle}
        // overflowYBodyStyle={overflowYBodyStyle}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <>
        <InlineWorkspaceItemTypeFilter
          loadData={loadData}
          filterModel={workspaceFilterModel}
          setFilterModel={setWorkspaceFilterModel}
          className={"mr-2"}
        />
      </>
    );
  };

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreateWorkflowWizard />
    );
  };

  return (
    <FilterContainer
      addRecordFunction={createWorkspaceItem}
      minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      body={getTabAndViewContainer()}
      titleIcon={faRectangleList}
      filterDto={workspaceFilterModel}
      setFilterDto={setWorkspaceFilterModel}
      supportViewToggle={true}
      isLoading={isLoading}
      loadData={loadData}
      inlineFilters={getInlineFilters()}
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