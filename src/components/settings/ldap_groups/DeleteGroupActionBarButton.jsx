import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import LdapUserGroupRoleHelper from "@opsera/know-your-role/roles/accounts/groups/user/ldapUserGroupRole.helper";
import useLdapGroupActions from "hooks/ldap/groups/useLdapGroupActions";

export default function DeleteGroupActionBarButton(
  {
    groupModel,
    orgDomain,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const ldapGroupActions = useLdapGroupActions();
  console.log("")
  const isOwner = userData?.email === groupModel?.getData("ownerEmail");

  const handleDeleteFunction = async () => {
    return ldapGroupActions.deleteLdapGroup(orgDomain, groupModel?.getData("name"));
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Policy"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(`settings/${orgDomain}/groups`)}
      />
    );
  };

  if (LdapUserGroupRoleHelper.canDeleteGroup(userData, groupModel?.getOriginalData()) !== true && isOwner !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Policy`}
      className={className}
    />
  );
}

DeleteGroupActionBarButton.propTypes = {
  groupModel: PropTypes.object,
  orgDomain: PropTypes.string,
  className: PropTypes.string,
};
