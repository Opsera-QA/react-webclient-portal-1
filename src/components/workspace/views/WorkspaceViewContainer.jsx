import React, { useState } from "react";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import WorkspaceFilterModel from "components/workspace/views/workspace.filter.model";

export default function WorkspaceViewContainer() {
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new WorkspaceFilterModel());

  const getCurrentView = () => {
    switch (workspaceFilterModel?.getData("type")) {
      case "pipelines":
        return "test 1";
      case "registry":
        return "test 2";
      case "tasks":
        return "test 3";
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <WorkspaceVerticalTabContainer
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
      title={"Workspace"}
      className={"px-2 pb-2"}
    />
  );
}

WorkspaceViewContainer.propTypes = {};