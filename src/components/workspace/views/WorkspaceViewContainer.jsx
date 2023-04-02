import React, { useContext } from "react";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer, {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION,
} from "components/common/table/FilterContainer";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import { DialogToastContext } from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import InlineWorkspaceItemTypeFilter from "components/common/filters/workspace/type/InlineWorkspaceItemTypeFilter";
import { workspaceConstants } from "components/workspace/workspace.constants";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import WorkspaceItemViews from "components/workspace/views/all/WorkspaceItemViews";
import WorkspaceTaskViews from "components/workspace/views/task/WorkspaceTaskViews";
import WorkspaceRegistryViews from "components/workspace/views/tool/WorkspaceRegistryViews";

export default function WorkspaceViewContainer(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    workspaceItems,
    loadData,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);

  const getCurrentView = () => {
    switch (workspaceFilterModel?.getData("type")) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkspacePipelineViews
            pipelines={workspaceItems}
            isLoading={isLoading}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
            loadData={loadData}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL:
        return (
          <WorkspaceRegistryViews
            isLoading={isLoading}
            loadData={loadData}
            tools={workspaceItems}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkspaceTaskViews
            tasks={workspaceItems}
            loadData={loadData}
            isLoading={isLoading}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.ALL:
      default:
        return (
          <WorkspaceItemViews
            workspaceItems={workspaceItems}
            isLoading={isLoading}
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
            loadData={loadData}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <WorkspaceVerticalTabContainer
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
      addRecordButtonCustomText={"Create New"}
      className={"px-2 pb-2"}
    />
  );
}

WorkspaceViewContainer.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  workspaceItems: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};