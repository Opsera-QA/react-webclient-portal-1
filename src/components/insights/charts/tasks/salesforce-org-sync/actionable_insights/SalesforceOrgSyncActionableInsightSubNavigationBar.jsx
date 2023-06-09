import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS,
} from "./SalesforceOrgSyncActionableInsightOverlay";

export default function SalesforceOrgSyncActionableInsightSubNavigationBar(
  {
    currentScreen,
    setCurrentScreen,
    setSelectedRunObject,
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
      case SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY:
        setCurrentScreen(SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY);
        setSelectedRunObject(undefined);
        return;
      case SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY:
        setCurrentScreen(SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY);
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
          tabName={SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Task Run Record"}
        />
        <NavigationTab
          tabName={SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Task Components"}
          visible={
            currentScreen === SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_COMPONENT_SUMMARY
          }
        />
      </NavigationTabContainer>
    </div>
  );
}

SalesforceOrgSyncActionableInsightSubNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedRunObject: PropTypes.func,
};
