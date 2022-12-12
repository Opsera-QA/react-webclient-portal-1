import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faBallotCheck, faDraftingCompass, faHexagon, faLayerGroup} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";

function WorkflowSubNavigationBar({currentTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "catalog":
        history.push(pipelineCatalogHelper.getManagementScreenLink());
        return;
      case "pipelines":
        history.push(pipelineHelper.getManagementScreenLink());
        return;
      case "pipelineInstructionsManagement":
        history.push(pipelineInstructionsHelper.getManagementScreenLink());
        return;
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
        tabText={"Pipeline Template Viewer"}
        handleTabClick={handleTabClick}
        tabName={"customerPipelineTemplateDetailView"}
        toolTipText={"Pipeline Template Viewer"}
        icon={faHexagon}
        hideIfInactive={true}
      />
      <NavigationTab
        activeTab={currentTab}
        tabText={"Pipeline Template Viewer"}
        handleTabClick={handleTabClick}
        tabName={"platformPipelineTemplateDetailView"}
        toolTipText={"Pipeline Template Viewer"}
        icon={faHexagon}
        hideIfInactive={true}
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
        activeTab={currentTab}
        tabText={"Pipeline Viewer"}
        handleTabClick={handleTabClick}
        tabName={"pipelineViewer"}
        toolTipText={"Pipeline Viewer"}
        icon={faLayerGroup}
        hideIfInactive={true}
      />
      <NavigationTab
        icon={faBallotCheck}
        tabName={"pipelineInstructionsManagement"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Instructions"}
      />
      <NavigationTab
        icon={faBallotCheck}
        tabName={"pipelineInstructionsViewer"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Pipeline Instructions Viewer"}
        hideIfInactive={true}
      />
    </NavigationTabContainer>
  );
}

WorkflowSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default WorkflowSubNavigationBar;
