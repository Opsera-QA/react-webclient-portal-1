import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useApiState from "hooks/general/api/useApiState";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";

export default function RevokeGroupAccessRulesButton(
  {
    groupModel,
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
  } = useComponentStateReference();
  const ldapGroupActions = useLdapGroupActions();

  const revokeGroupMembership = async () => {
    try {
      apiStateFunctions.setBusyState();
      await ldapGroupActions.revokeAssignedGroupAccessRules(groupModel?.getName());
      apiStateFunctions.setSuccessState();
      await loadData();
    }
    catch (error) {
      console.error(error);
      apiStateFunctions.setErrorState();
    }
  };

  if (isSiteAdministrator !== true || hasStringValue(domain) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"danger"}
      onClickFunction={revokeGroupMembership}
      normalText={"Revoke Assigned Group Access Rules"}
      busyText={"Revoking Assigned Group Access Rules"}
      errorText={"Failed to Revoke Assigned Group Access Rules"}
      successText={"Revoked Assigned Group Access Rules"}
      buttonState={apiState}
      className={className}
      icon={faTrash}
    />
  );
}

RevokeGroupAccessRulesButton.propTypes = {
  groupModel: PropTypes.object,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
