import React, {useEffect, useState} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import MyUserRecord from "components/user/user_settings/user_record/MyUserRecord";
import {useHistory, useParams} from "react-router-dom";
import MyUserProfile from "components/user/user_settings/profile/MyUserProfile";
import MyAccessTokens from "components/user/user_settings/access_tokens/MyAccessTokens";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import MySubscriptions from "components/user/user_settings/subscriptions/MySubscriptions";
import useComponentStateReference from "hooks/useComponentStateReference";
import UserSettingsSubNavigationBar from "components/user/user_settings/UserSettingsSubNavigationBar";

function UserSettings() {
  const { tab } = useParams();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tab ? tab : "profile");
  const {
    accessRoleData,
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }, [tab]);

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
      // case "currentToken":
      //   return <MyCurrentToken />;
      case "subscriptions":
        return <MySubscriptions />;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<UserSettingsSubNavigationBar activeTab={activeTab} />}
      breadcrumbDestination={getBreadcrumbDestination()}
      roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      accessRoleData={accessRoleData}
      pageDescription={getDescription()}
    >
      {getCurrentView()}
    </ScreenContainer>
  );
}

export default UserSettings;
