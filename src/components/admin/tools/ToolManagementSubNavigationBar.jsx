import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faToolbox, faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function ToolManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "categories":
        history.push(`/admin/tools/categories`);
        return;
      case "identifiers":
        history.push(`/admin/tools/identifiers`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "toolIdentifierViewer":
        return (
          <NavigationTab
            icon={faTools}
            tabName={"toolIdentifierViewer"}
            handleTabClick={handleTabClick}
            activeTab={"toolIdentifierViewer"}
            tabText={"Tool Identifier Viewer"}
          />
        );
      case "toolCategoryViewer":
        return (
          <NavigationTab
            icon={faToolbox}
            tabName={"toolCategoryViewer"}
            handleTabClick={handleTabClick}
            activeTab={"toolCategoryViewer"}
            tabText={"Tool Category Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Admin Tools"}
      />
      <NavigationTab
        icon={faToolbox}
        tabName={"categories"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Categories"}/>
      <NavigationTab
        icon={faTools}
        tabName={"identifiers"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Tool Identifiers"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

ToolManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default ToolManagementSubNavigationBar;
