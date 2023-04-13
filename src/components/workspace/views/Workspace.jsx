import React, {useContext} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkspaceSubNavigationBar from "components/workspace/views/WorkspaceSubNavigationBar";
import useGetWorkspaceItems from "hooks/workspace/useGetWorkspaceItems";
import {DialogToastContext} from "contexts/DialogToastContext";
import {workspaceConstants} from "components/workspace/workspace.constants";
import WorkspacePipelineViews from "components/workspace/views/pipeline/WorkspacePipelineViews";
import WorkspaceRegistryViews from "components/workspace/views/tool/WorkspaceRegistryViews";
import WorkspaceTaskViews from "components/workspace/views/task/WorkspaceTaskViews";
import WorkspaceItemViews from "components/workspace/views/all/WorkspaceItemViews";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import InlineWorkspaceItemTypeFilter from "components/common/filters/workspace/type/InlineWorkspaceItemTypeFilter";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import WorkspaceFilterOverlay from "components/workspace/WorkspaceFilterOverlay";

export default function Workspace() {
  const {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    error,
    loadData,
  } = useGetWorkspaceItems();
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
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={workspaceFilterModel}
        setFilterDto={setWorkspaceFilterModel}
        data={workspaceItems}
        nextGeneration={true}
      >
        <SideBySideViewBase
          leftSideView={getVerticalTabContainer()}
          rightSideView={getCurrentView()}
          leftSideMinimumWidth={"150px"}
          leftSideMaximumWidth={"150px"}
          minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
        />
      </PaginationContainer>
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
      <CreateWorkspaceResourceWizard
        loadDataFunction={loadData}
      />
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"workspace"}
      error={error}
      filterModel={workspaceFilterModel}
      setFilterModel={setWorkspaceFilterModel}
      filterOverlay={<WorkspaceFilterOverlay loadDataFunction={loadData} workspaceFilterModel={workspaceFilterModel} />}
      loadDataFunction={loadData}
      addRecordFunction={createWorkspaceItem}
      bodyClassName={""}
      navigationTabContainer={<WorkspaceSubNavigationBar />}
    >
      {getTabAndViewContainer()}
    </ScreenContainer>
  );
}
