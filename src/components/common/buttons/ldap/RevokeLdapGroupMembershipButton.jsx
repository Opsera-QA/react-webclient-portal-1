import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faUserSlash} from "@fortawesome/pro-light-svg-icons";

export default function RevokeLdapGroupMembershipButton(
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
      await ldapUserActions.revokeUserGroupMembership(userModel?.getData("email"));
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
      normalText={"Revoke Group Membership"}
      busyText={"Revoking Group Membership"}
      errorText={"Failed to Revoke Group Membership"}
      successText={"Revoked Group Membership"}
      buttonState={apiState}
      className={className}
      icon={faUserSlash}
    />
  );
}

RevokeLdapGroupMembershipButton.propTypes = {
  userModel: PropTypes.object,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
