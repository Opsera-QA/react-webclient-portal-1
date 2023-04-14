import React from "react";
import {faRectangleList} from "@fortawesome/pro-light-svg-icons";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";

export default function WorkspaceSubNavigationBar() {
  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faRectangleList}
        tabName={"workspace"}
        handleTabClick={() => {}}
        activeTab={"workspace"}
        tabText={"Workspace"}
      />
    </NavigationTabContainer>
  );
}

WorkspaceSubNavigationBar.propTypes = {};
