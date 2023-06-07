import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS,
} from "./BulkMigrationActionableInsightOverlay";

export default function BulkMigrationActionableInsightSubNavigationBar(
  {
    currentScreen,
    setCurrentScreen,
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
      case BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS.BULK_MIGRATION_RUN_SUMMARY:
        setCurrentScreen(BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS.BULK_MIGRATION_RUN_SUMMARY);
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
          tabName={BULK_MIGRATION_ACTIONABLE_INSIGHT_SCREENS.BULK_MIGRATION_RUN_SUMMARY}
          handleTabClick={handleTabClick}
          activeTab={currentScreen}
          tabText={"Task Run Record"}
        />
      </NavigationTabContainer>
    </div>
  );
}

BulkMigrationActionableInsightSubNavigationBar.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
};
