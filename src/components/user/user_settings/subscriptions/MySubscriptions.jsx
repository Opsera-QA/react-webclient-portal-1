import React, {useState} from "react";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faDraftingCompass, faTag} from "@fortawesome/pro-light-svg-icons";
import TagSubscriptionsPanel from "components/user/user_settings/subscriptions/TagSubscriptionsPanel";
import PipelineSubscriptionsPanel from "components/user/user_settings/subscriptions/PipelineSubscriptionsPanel";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";

function MySubscriptions() {
  const [activeTab, setActiveTab] = useState("tags");
  const {
    accessRoleData,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Tag Subscriptions"} handleTabClick={handleTabClick} tabName={"tags"}
                   icon={faTag}/>
        <CustomTab activeTab={activeTab} tabText={"Pipeline Subscriptions"} handleTabClick={handleTabClick}
                   tabName={"pipelines"} icon={faDraftingCompass}/>
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tags":
        return (<TagSubscriptionsPanel/>);
      case "pipelines":
        return <PipelineSubscriptionsPanel className={"p-3"}/>;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={USER_SETTINGS_PAGES.MY_SUBSCRIPTIONS}/>}
      breadcrumbDestination={USER_SETTINGS_PAGES.MY_SUBSCRIPTIONS}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      accessRoleData={accessRoleData}
    >
      <div className="px-3">
        <TabPanelContainer
          currentView={getCurrentView()}
          tabContainer={getTabContainer()}
        />
      </div>
    </ScreenContainer>
  );
}

export default MySubscriptions;

