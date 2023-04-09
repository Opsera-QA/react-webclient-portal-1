import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";
import {faUserSlash} from "@fortawesome/pro-light-svg-icons";

export default function RevokeUserAccessTokensButton(
  {
    userModel,
    loadData,
    className,
  }) {
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();
  const {
    isSiteAdministrator,
  } = useComponentStateReference();
  const ldapUserActions = useLdapUserActions();

  const revokeAccessTokens = async () => {
    try {
      apiStateFunctions.setBusyState();
      await ldapUserActions.revokeUserAccessTokens(userModel?.getData("_id"));
      apiStateFunctions.setSuccessState();
      await loadData();
    }
    catch (error) {
      console.error(error);
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      onClickFunction={revokeAccessTokens}
      normalText={"Revoke User Access Tokens"}
      busyText={"Revoking User Access Tokens"}
      errorText={"Failed to Revoke User Access Tokens"}
      successText={"Revoked User Access Tokens"}
      buttonState={apiState}
      className={className}
      icon={faUserSlash}
    />
  );
}

RevokeUserAccessTokensButton.propTypes = {
  userModel: PropTypes.object,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
