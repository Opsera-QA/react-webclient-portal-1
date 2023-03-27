import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";

export default function RevokeUserAccessRulesButton(
  {
    userEmailAddress,
    domain,
    loadData,
    className,
  }) {
  const {
    apiState,
    apiStateFunctions,
  } = useApiState();
  const {
    isSiteAdministrator,
    toastContext,
  } = useComponentStateReference();
  const ldapUserActions = useLdapUserActions();

  const revokeUserMembership = async () => {
    try {
      apiStateFunctions.setBusyState();
      await ldapUserActions.removeUserFromAssignedRules(
        userEmailAddress,
      );
      apiStateFunctions.setSuccessState();
      toastContext.showSystemSuccessToast("Successfully Revoked Assigned User Access Rules");

      if (loadData) {
        await loadData();
      }
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error, "Failed to Revoke Assigned User Access Rules:");
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true || hasStringValue(domain) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"danger"}
      onClickFunction={revokeUserMembership}
      normalText={"Revoke Assigned User Access Rules"}
      busyText={"Revoking Assigned User Access Rules"}
      errorText={"Failed to Revoke Assigned User Access Rules"}
      successText={"Revoked Assigned User Access Rules"}
      buttonState={apiState}
      className={className}
      icon={faTrash}
    />
  );
}

RevokeUserAccessRulesButton.propTypes = {
  userEmailAddress: PropTypes.string,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
