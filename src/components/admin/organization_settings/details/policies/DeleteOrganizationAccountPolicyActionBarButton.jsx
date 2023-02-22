import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import {useHistory} from "react-router-dom";
import usePolicyAdministrationActions
  from "hooks/settings/organization_settings/policies/usePolicyAdministrationActions";

export default function DeletePolicyActionBarButton(
  {
    policyModel,
    organizationDomain,
    organizationAccountId,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const policyAdministrationActions = usePolicyAdministrationActions();

  const handleDeleteFunction = async () => {
    return await policyAdministrationActions.deletePolicy(
      policyModel?.getMongoDbId(),
      organizationDomain,
      organizationAccountId,
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Policy"}
        handleDeleteFunction={handleDeleteFunction}
      />
    );
  };

  if (PolicyRoleHelper.canEditPolicies(userData) !== true) {
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

DeletePolicyActionBarButton.propTypes = {
  policyModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
  className: PropTypes.string,
};
