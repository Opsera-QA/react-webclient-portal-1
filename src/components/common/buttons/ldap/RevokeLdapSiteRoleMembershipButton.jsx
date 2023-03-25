import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faUserSlash} from "@fortawesome/pro-light-svg-icons";

export default function RevokeLdapSiteRoleMembershipButton(
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
  const ldapDomain = userModel?.getData("ldap.domain");

  const revokeGroupMembership = async () => {
    try {
      apiStateFunctions.setBusyState();
      await ldapUserActions.revokeSiteRoleMembership(userModel?.getData("email"));
      apiStateFunctions.setSuccessState();
      await loadData();
    }
    catch (error) {
      console.error(error);
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true || hasStringValue(ldapDomain) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      onClickFunction={revokeGroupMembership}
      normalText={"Revoke Site Role Membership"}
      busyText={"Revoking Site Role Membership"}
      errorText={"Failed to Revoke Site Role Membership"}
      successText={"Revoked Site Role Membership"}
      buttonState={apiState}
      className={className}
      icon={faUserSlash}
    />
  );
}

RevokeLdapSiteRoleMembershipButton.propTypes = {
  userModel: PropTypes.object,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
