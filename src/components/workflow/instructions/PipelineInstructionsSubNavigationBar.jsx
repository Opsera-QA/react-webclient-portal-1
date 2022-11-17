import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faBallotCheck } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function PipelineInstructionsSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
      case "pipelineInstructionsManagement":
        history.push(`/settings/pipelines/instructions`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "pipelineInstructionsViewer":
        return (
          <NavigationTab
            icon={faBallotCheck}
            tabName={"pipelineInstructionsViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Pipeline Instructions Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faBallotCheck}
        tabName={"pipelineInstructionsManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Pipeline Instructions"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

PipelineInstructionsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default PipelineInstructionsSubNavigationBar;
