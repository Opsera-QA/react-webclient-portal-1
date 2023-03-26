import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faUsersSlash} from "@fortawesome/pro-light-svg-icons";
import RevokeAssignedUserAccessRulesOverlay
  from "components/settings/users/details/assigned_roles/revoke/RevokeAssignedUserAccessRulesOverlay";

export default function LaunchRevokeUserAccessRulesOverlayButton(
  {
    userEmailAddress,
    domain,
    loadData,
    className,
  }) {
  const {
    isSiteAdministrator,
    toastContext,
  } = useComponentStateReference();

  const launchRevokeUserAccessRulesOverlay = async () => {
    toastContext.showOverlayPanel(
      <RevokeAssignedUserAccessRulesOverlay
        userEmailAddress={userEmailAddress}
        domain={domain}
        loadData={loadData}
      />
    );
  };

  if (isSiteAdministrator !== true || hasStringValue(domain) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      variant={"danger"}
      onClickFunction={launchRevokeUserAccessRulesOverlay}
      normalText={"Revoke Assigned User Access Rules"}
      className={className}
      icon={faUsersSlash}
      buttonSize={"sm"}
    />
  );
}

LaunchRevokeUserAccessRulesOverlayButton.propTypes = {
  userEmailAddress: PropTypes.string,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
