import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faBallotCheck, faDraftingCompass, faHexagon, faLayerGroup} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function WorkflowSubNavigationBar({currentTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "catalog":
        history.push(`/workflow/catalog/library`);
        return;
      case "pipelines":
        history.push(`/workflow/`);
        return;
      case "pipelineInstructionsManagement":
        history.push(`/workflow/instructions`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "pipelineViewer":
        return (
          <NavigationTab
            activeTab={currentTab}
            tabText={"Pipeline Viewer"}
            handleTabClick={handleTabClick}
            tabName={"pipelineViewer"}
            toolTipText={"Pipeline Viewer"}
            icon={faLayerGroup}
          />
        );
      case "pipelineInstructionsViewer":
        return (
          <NavigationTab
            icon={faBallotCheck}
            tabName={"pipelineInstructionsViewer"}
            handleTabClick={handleTabClick}
            activeTab={currentTab}
            tabText={"Pipeline Instructions Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        activeTab={currentTab}
        tabText={"Catalog"}
        handleTabClick={handleTabClick}
        tabName={"catalog"}
        toolTipText={"Catalog"}
        icon={faHexagon}
      />
      <NavigationTab
        activeTab={currentTab}
        tabText={"Pipelines"}
        handleTabClick={handleTabClick}
        tabName={"pipelines"}
        toolTipText={"Pipelines"}
        icon={faDraftingCompass}
      />
      <NavigationTab
        icon={faBallotCheck}
        tabName={"pipelineInstructionsManagement"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Instructions"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

WorkflowSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default WorkflowSubNavigationBar;
