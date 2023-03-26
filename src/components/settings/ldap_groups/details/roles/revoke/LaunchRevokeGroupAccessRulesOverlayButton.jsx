import React from 'react';
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faUsersSlash} from "@fortawesome/pro-light-svg-icons";
import RevokeAssignedGroupAccessRulesOverlay
  from "components/settings/ldap_groups/details/roles/revoke/RevokeAssignedGroupAccessRulesOverlay";

export default function LaunchRevokeGroupAccessRulesOverlayButton(
  {
    groupModel,
    domain,
    loadData,
    className,
  }) {
  const {
    isSiteAdministrator,
    toastContext,
  } = useComponentStateReference();

  const launchRevokeGroupAccessRulesOverlay = async () => {
    toastContext.showOverlayPanel(
      <RevokeAssignedGroupAccessRulesOverlay
        groupModel={groupModel}
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
      onClickFunction={launchRevokeGroupAccessRulesOverlay}
      normalText={"Revoke Assigned Group Access Rules"}
      className={className}
      icon={faUsersSlash}
      buttonSize={"sm"}
    />
  );
}

LaunchRevokeGroupAccessRulesOverlayButton.propTypes = {
  groupModel: PropTypes.object,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
