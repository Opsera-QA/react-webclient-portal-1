import React, {useContext} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkspaceViewContainer from "components/workspace/views/WorkspaceViewContainer";
import useGetWorkspaceItems from "hooks/workspace/useGetWorkspaceItems";
import {DialogToastContext} from "contexts/DialogToastContext";
import {workspaceConstants} from "components/workspace/workspace.constants";
import WorkspacePipelineViews from "components/workspace/views/pipeline/WorkspacePipelineViews";
import WorkspaceRegistryViews from "components/workspace/views/tool/WorkspaceRegistryViews";
import WorkspaceTaskViews from "components/workspace/views/task/WorkspaceTaskViews";
import WorkspaceItemViews from "components/workspace/views/all/WorkspaceItemViews";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import FilterContainer, {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import InlineWorkspaceItemTypeFilter from "components/common/filters/workspace/type/InlineWorkspaceItemTypeFilter";
import CustomerTagFilter from "components/common/filters/tags/tag/CustomerTagFilter";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import {faRectangleList} from "@fortawesome/pro-light-svg-icons";
import WorkspaceTagFilter from "components/workspace/views/filters/WorkspaceTagFilter";

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

  const getDropdownFilters = () => {
    return (
      <>
        <WorkspaceTagFilter
          filterModel={workspaceFilterModel}
          setFilterModel={setWorkspaceFilterModel}
          className={"mb-2"}
        />
        <ActiveFilter
          filterDto={workspaceFilterModel}
          setFilterDto={setWorkspaceFilterModel}
          fieldName={"active"}
          className={"mb-2"}
        />
        <OwnerFilter
          filterModel={workspaceFilterModel}
          setFilterModel={setWorkspaceFilterModel}
          className={"mb-3"}
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
      filters={getDropdownFilters()}
      loadDataFunction={loadData}
    >
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
        dropdownFilters={getDropdownFilters()}
        title={"Workspace"}
        type={"Workspace Item"}
        addRecordButtonCustomText={"Create New"}
        className={"px-2 pb-2"}
      />
    </ScreenContainer>
  );
}
