import React, {useState} from "react";
import TagSubscriptionsPanel from "components/user/user_settings/subscriptions/TagSubscriptionsPanel";
import FollowedPipelinesPanel from "components/user/user_settings/subscriptions/FollowedPipelinesPanel";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import {userSettingsTrails} from "components/user/user_settings/userSettings.trails";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER,
} from "components/common/table/FilterContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import FollowingVerticalTabContainer from "components/user/user_settings/subscriptions/FollowingVerticalTabContainer";
import userSubscriptionConstants from "@opsera/definitions/constants/subscriptions/userSubscription.constants";
import FollowedTasksPanel from "components/user/user_settings/subscriptions/FollowedTasksPanel";
import FollowedDashboardsPanel from "components/user/user_settings/subscriptions/FollowedDashboardsPanel";

export default function Following() {
  const [activeTab, setActiveTab] = useState(userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.DASHBOARD);

  const getCurrentView = () => {
    switch (activeTab) {
      case userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.DASHBOARD:
        return (
          <FollowedDashboardsPanel
          />
        );
      case userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.PIPELINE:
        return (
          <FollowedPipelinesPanel
          />
        );
      case userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.TAG:
        return (
          <TagSubscriptionsPanel
          />
        );
      case userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.TASK:
        return (
          <FollowedTasksPanel />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.MY_SUBSCRIPTIONS}/>}
      breadcrumbDestination={userSettingsTrails.subscriptions.name}
      bodyClassName={"dummy"}
    >
      <SideBySideViewBase
        leftSideView={<FollowingVerticalTabContainer activeTab={activeTab} setActiveTab={setActiveTab}/>}
        rightSideView={getCurrentView()}
        leftSideMinimumWidth={"175px"}
        leftSideMaximumWidth={"175px"}
        minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER}
      />
    </ScreenContainer>
  );
}
