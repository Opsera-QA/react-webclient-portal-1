import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PolicyRoleHelper from "@opsera/know-your-role/roles/settings/policies/policyRole.helper";
import {useHistory} from "react-router-dom";
import useFeatureFlagAdministrationActions
  from "hooks/settings/organization_settings/feature_flags/useFeatureFlagAdministrationActions";

export default function DeleteOrganizationAccountFeatureFlagActionBarButton(
  {
    featureFlagModel,
    organizationDomain,
    organizationAccountId,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const featureFlagAdministrationActions = useFeatureFlagAdministrationActions();

  const handleDeleteFunction = async () => {
    return await featureFlagAdministrationActions.deleteFeatureFlag(
      featureFlagModel?.getMongoDbId(),
      organizationDomain,
      organizationAccountId,
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Feature Flag"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(history.location)}
      />
    );
  };

  return (
    <ActionBarButton
      action={showOverlayFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Feature flag`}
      className={className}
    />
  );
}

DeleteOrganizationAccountFeatureFlagActionBarButton.propTypes = {
  featureFlagModel: PropTypes.object,
  organizationDomain: PropTypes.string,
  organizationAccountId: PropTypes.string,
  className: PropTypes.string,
};
