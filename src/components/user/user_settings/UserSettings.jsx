import React, {useContext, useEffect, useState} from "react";
import {faRss, faIdCard, faKey, faUser} from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import MyUserRecord from "components/user/user_settings/user_record/MyUserRecord";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import MyUserProfile from "components/user/user_settings/profile/MyUserProfile";
import MyAccessTokens from "components/user/user_settings/access_tokens/MyAccessTokens";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import MySubscriptions from "components/user/user_settings/subscriptions/MySubscriptions";

function UserSettings() {
  const { tab } = useParams();
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isLdapUser, setIsLdapUser] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [activeTab, setActiveTab] = useState(tab ? tab : "profile");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess && user) {
      setUser(user);
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess) {
        let {ldap} = user;
        const isLdapUser = userRoleAccess?.Type !== "sass-user" && ldap?.domain != null;

        if (!isLdapUser && tab !== "profile") {
          setActiveTab("profile");
        }

        setIsLdapUser(isLdapUser);
      }
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
    history.push(`/user/${tabSelection}`);
  };

  const getBreadcrumbDestination = () => {
    switch (activeTab) {
      case "myUserRecord":
        return "myUserRecord";
      case "accessTokens":
        return "myAccessTokens";
      case "subscriptions":
        return "subscriptions";
      case "profile":
      default:
        return "userProfile";
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case "accessTokens":
        return (
          `You can generate multiple personal access tokens with unique expiration dates in order to interact with the
          Opsera API.`
        );
      default:
        return (
          `Review and manage your user profile information as well as platform settings from this page. 
          Please note, profile details are stored in your identify provider so some changes may not be possible from this portal at this time.`
        );
    }
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "profile":
        return <MyUserProfile />;
      case "myUserRecord":
        return <MyUserRecord />;
      case "accessTokens":
        return <MyAccessTokens />;
      case "subscriptions":
        return <MySubscriptions />;
      default:
        return null;
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faIdCard} tabName={"profile"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"My Profile"} />
        <NavigationTab icon={faUser} tabName={"myUserRecord"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"My Record"} visible={isLdapUser} />
        <NavigationTab icon={faKey} tabName={"accessTokens"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Access Tokens"} />
        <NavigationTab icon={faRss} tabName={"subscriptions"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Subscriptions"} />
      </NavigationTabContainer>
    );
  };

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={getBreadcrumbDestination()}
      isLoading={!accessRoleData || isLdapUser == null}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      accessRoleData={accessRoleData}
      pageDescription={getDescription()}>
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default UserSettings;
