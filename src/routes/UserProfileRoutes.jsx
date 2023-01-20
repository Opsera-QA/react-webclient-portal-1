import React from "react";
import MyUserProfile from "components/user/user_settings/profile/MyUserProfile";
import MyUserRecord from "components/user/user_settings/user_record/MyUserRecord";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import MyAccessTokens from "components/user/user_settings/access_tokens/MyAccessTokens";
import MySubscriptions from "components/user/user_settings/subscriptions/MySubscriptions";
import {USER_SETTINGS_PAGES} from "components/user/user_settings/userSettings.paths";
import AccessTokenDetailView from "components/user/user_settings/access_tokens/details/AccessTokenDetailView";

export default function UserProfileRoutes() {
  return (
    <>
      <RoleRestrictedRoute
        path={`/user/${USER_SETTINGS_PAGES.MY_USER_PROFILE}`}
        exact={true}
        component={MyUserProfile}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={`/user/${USER_SETTINGS_PAGES.MY_USER_RECORD}`}
        exact={true}
        component={MyUserRecord}
        roleRequirement={ROLE_LEVELS.USERS}
      />
      <RoleRestrictedRoute
        path={`/user/${USER_SETTINGS_PAGES.MY_ACCESS_TOKENS}`}
        exact={true}
        component={MyAccessTokens}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path="/user/access-tokens/details/:tokenId"
        exact={true}
        component={AccessTokenDetailView}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
      {/*<RoleRestrictedRoute*/}
      {/*path={`/user/${USER_SETTINGS_PAGES.MY_CURRENT_TOKEN}`}*/}
      {/*  exact={true}*/}
      {/*  component={MyCurrentToken}*/}
      {/*  roleRequirement={ROLE_LEVELS.USERS_AND_SASS}*/}
      {/*/>*/}
      <RoleRestrictedRoute
        path={`/user/${USER_SETTINGS_PAGES.MY_SUBSCRIPTIONS}`}
        exact={true}
        component={MySubscriptions}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
    </>
  );
}

UserProfileRoutes.propTypes = {};

