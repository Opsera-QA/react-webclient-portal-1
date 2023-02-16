import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS,
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";

export default function GithubActionsWorkflowActionableInsightSubNavigationBar(
  {
    currentScreen,
    setCurrentScreen,
    setSelectedWorkflowObject,
    setSelectedJobName,
    setSelectedJobRuns,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === currentScreen) {
      return;
    }

    switch (tabSelection) {
      case "insights":
        toastContext.removeInlineMessage();
        toastContext.clearInfoOverlayPanel();
        return;
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY:
        setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY);
        setSelectedWorkflowObject(undefined);
        setSelectedJobName(undefined);
        setSelectedJobRuns(undefined);
        return;
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY:
        setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY);
        setSelectedJobRuns(undefined);
        return;
      case GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY:
        setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY);
        return;
    }
  };

  return (
    <div className={"mx-3 mb-2"}>
      <NavigationTabContainer>
        <NavigationTab
          icon={faArrowLeft}
          tabName={"insights"}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Back to Insights"}
        />
        <NavigationTab
          tabName={GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_DETAILED_WORKFLOW_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Detailed Workflow Summary"}
        />
        <NavigationTab
          tabName={GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Unique Run Summary"}
          visible={
            currentScreen === GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_UNIQUE_RUN_SUMMARY
            || currentScreen === GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY
          }
        />
        <NavigationTab
          tabName={GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Step Details"}
          visible={currentScreen === GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY}
        />
      </NavigationTabContainer>
    </div>
  );
}

GithubActionsWorkflowActionableInsightSubNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedWorkflowObject: PropTypes.func,
  setSelectedJobName: PropTypes.func,
  setSelectedJobRuns: PropTypes.func,
};
