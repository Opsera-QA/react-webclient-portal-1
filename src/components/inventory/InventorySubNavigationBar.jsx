import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faFileCode, faHandshake, faProjectDiagram, faServer, faTools} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function InventorySubNavigationBar({currentTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "tools":
        history.push(`/inventory/tools`);
        return;
      case "platform":
        history.push(`/inventory/platform`);
        return;
      case "parameters":
        history.push(`/inventory/parameters`);
        return;
      case "scripts":
        history.push(`/inventory/scripts`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "toolViewer":
        return (
          <NavigationTab
            icon={faTools}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"toolViewer"}
            tabText={"Tool Viewer"}
          />
        );
      case "toolProjectViewer":
        return (
          <NavigationTab
            icon={faProjectDiagram}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"toolProjectViewer"}
            tabText={"Tool Project Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab icon={faTools} tabName={"tools"} handleTabClick={handleTabClick} activeTab={currentTab} tabText={"Tools"} />
      <NavigationTab icon={faServer} tabName={"platform"} handleTabClick={handleTabClick} activeTab={currentTab} tabText={"Platform"} />
      <NavigationTab icon={faHandshake} tabName={"parameters"} handleTabClick={handleTabClick} activeTab={currentTab} tabText={"Parameters"} />
      <NavigationTab icon={faFileCode} tabName={"scripts"} handleTabClick={handleTabClick} activeTab={currentTab} tabText={"Scripts"} />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

InventorySubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default InventorySubNavigationBar;
