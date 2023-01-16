import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import {useHistory} from "react-router-dom";

export default function DeletePolicyActionBarButton(
  {
    policyModel,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const policyActions = usePolicyActions();

  const handleDeleteFunction = async () => {
    return await policyActions.deletePolicy(
      policyModel?.getMongoDbId(),
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Policy"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(policyHelper.getManagementScreenLink())}
      />
    );
  };

  if (PolicyRoleHelper.canEditPolicies(userData) !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      size={""}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Pipeline Step`}
      className={className}
    />
  );
}

DeletePolicyActionBarButton.propTypes = {
  policyModel: PropTypes.object,
  className: PropTypes.string,
};
