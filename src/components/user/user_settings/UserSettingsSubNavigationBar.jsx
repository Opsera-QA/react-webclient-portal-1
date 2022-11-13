import React from "react";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import PropTypes from "prop-types";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faIdCard, faKey, faRss, faUser} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserSettingsSubNavigationBar(
  {
    activeTab,
  }) {
  const history = useHistory();
  const {
    accessRoleData,
    isSaasUser,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    // setActiveTab(tabSelection);
    history.push(`/user/${tabSelection}`);
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faIdCard}
        tabName={"profile"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"My Profile"}
      />
      <NavigationTab
        icon={faUser}
        tabName={"myUserRecord"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"My Record"}
        visible={isSaasUser === false}
      />
      <NavigationTab
        icon={faKey}
        tabName={"accessTokens"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Access Tokens"}
      />
      {/*<NavigationTab
        icon={faKey}
        tabName={"currentToken"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
         tabText={"Current Access Token"}
         />*/}
      <NavigationTab
        icon={faRss}
        tabName={"subscriptions"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Subscriptions"}
      />
    </NavigationTabContainer>
  );
}

UserSettingsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
