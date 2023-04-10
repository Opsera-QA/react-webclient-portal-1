import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import {workspaceHelper} from "components/workspace/workspace.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import sessionHelper from "utils/session.helper";

export default function BackToWorkspaceSubNavigationBarItem() {
  const fromWorkspace = DataParsingHelper.parseBooleanV2(sessionHelper.getStoredUrlParameter("fromWorkspace"));
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "workspace":
        history.push(workspaceHelper.getManagementScreenLink());
        return;
    }
  };

  return (
    <NavigationTab
      activeTab={""}
      tabText={"Back to Workspace"}
      handleTabClick={handleTabClick}
      tabName={"workspace"}
      toolTipText={"Back to Workspace"}
      icon={faArrowLeft}
      visible={fromWorkspace === true}
    />
  );
}

BackToWorkspaceSubNavigationBarItem.propTypes = {};
