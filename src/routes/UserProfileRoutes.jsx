import React from "react";
import { SecureRoute } from "@okta/okta-react";
import UserSettings from "components/user/user_settings/UserSettings";
import AccessTokenDetailView from "components/user/user_settings/access_tokens/details/AccessTokenDetailView";

export default function UserProfileRoutes() {
  return (
    <>
      <SecureRoute path="/user/:tab?" exact component={UserSettings} />
      <SecureRoute path="/user/access-tokens/details/:tokenId?" exact component={AccessTokenDetailView} />
    </>
  );
}

UserProfileRoutes.propTypes = {};

