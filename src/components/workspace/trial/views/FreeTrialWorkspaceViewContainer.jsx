import React, { useState } from "react";
import FreeTrialWorkspaceVerticalTabContainer from "components/workspace/trial/views/FreeTrialWorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import FreeTrialWorkspaceRegistry from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistry";
import FreeTrialWorkspaceTasks from "components/workspace/trial/views/task/FreeTrialWorkspaceTasks";
import FreeTrialWorkspacePipelines from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelines";
import FreeTrialWorkspaceItems from "components/workspace/trial/views/all/FreeTrialWorkspaceItems";

export default function FreeTrialWorkspaceViewContainer() {
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new FreeTrialWorkspaceFilterModel());

  const getCurrentView = () => {
    switch (workspaceFilterModel?.getData("type")) {
      case "pipelines":
        return (
          <FreeTrialWorkspacePipelines
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "registry":
        return (
          <FreeTrialWorkspaceRegistry
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "tasks":
        return (
          <FreeTrialWorkspaceTasks
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "all":
      default:
        return (
          <FreeTrialWorkspaceItems
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <FreeTrialWorkspaceVerticalTabContainer
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
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

  return (
    <FilterContainer
      // addRecordFunction={createNewTask}
      body={getTabAndViewContainer()}
      titleIcon={faRectangleList}
      filterDto={workspaceFilterModel}
      setFilterDto={setWorkspaceFilterModel}
      supportViewToggle={true}
      title={"FreeTrialWorkspace"}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialWorkspaceViewContainer.propTypes = {};