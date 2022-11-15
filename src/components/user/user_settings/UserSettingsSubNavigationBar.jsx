import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import PropTypes from "prop-types";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faIdCard, faKey, faRss, faUser} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";

export default function UserSettingsSubNavigationBar(
  {
    activeTab,
  }) {
  const history = useHistory();
  const {
    isSaasUser,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    if (tabSelection === activeTab) {
      return;
    }

    e.preventDefault();
    history.push(`/user/${tabSelection}`);
  };

  const getDynamicTab = () => {
    if (activeTab === USER_SETTINGS_PAGES.ACCESS_TOKEN_DETAIL_VIEW) {
      return (
        <NavigationTab
          icon={faKey}
          tabName={USER_SETTINGS_PAGES.ACCESS_TOKEN_DETAIL_VIEW}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Access Token Viewer"}
        />
      );
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faIdCard}
        tabName={USER_SETTINGS_PAGES.MY_USER_PROFILE}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"My Profile"}
      />
      <NavigationTab
        icon={faUser}
        tabName={USER_SETTINGS_PAGES.MY_USER_RECORD}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"My Record"}
        visible={isSaasUser === false}
      />
      <NavigationTab
        icon={faKey}
        tabName={USER_SETTINGS_PAGES.MY_ACCESS_TOKENS}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Access Tokens"}
      />
      {/*<NavigationTab
        icon={faKey}
        tabName={USER_SETTINGS_PAGES.MY_CURRENT_TOKEN}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
         tabText={"Current Access Token"}
         />*/}
      <NavigationTab
        icon={faRss}
        tabName={USER_SETTINGS_PAGES.MY_SUBSCRIPTIONS}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Subscriptions"}
      />
      {getDynamicTab()}
    </NavigationTabContainer>
  );
}

UserSettingsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
