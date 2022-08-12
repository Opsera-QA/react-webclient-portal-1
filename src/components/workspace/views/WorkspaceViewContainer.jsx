@@ -0,0 +1,57 @@
import React, { useState } from "react";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import { faNetworkWired } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

export default function WorkspaceViewContainer() {
  const [activeView, setActiveView] = useState("pipelines");

  const getCurrentView = () => {
    switch (activeView) {
      case "pipelines":
        return activeView;
      case "tasks":
        return activeView;
      case "registry":
        return activeView;
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <WorkspaceVerticalTabContainer
        activeView={activeView}
        setActiveView={setActiveView}
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
      titleIcon={faNetworkWired}
      title={"Workspace"}
      className={"px-2 pb-2"}
    />
  );
}

WorkspaceViewContainer.propTypes = {};