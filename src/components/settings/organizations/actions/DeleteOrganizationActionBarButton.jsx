import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {organizationHelper} from "components/settings/organizations/organization.helper";

export default function DeleteOrganizationActionBarButton(
  {
    organizationModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  const handleDeleteFunction = async () => {
    return await organizationModel.deleteModel();
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Organization"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(organizationHelper.getManagementScreenLink())}
      />
    );
  };

  if (organizationModel?.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showOverlayFunction}
      type={`Organization`}
      className={className}
    />
  );
}

DeleteOrganizationActionBarButton.propTypes = {
  organizationModel: PropTypes.object,
  className: PropTypes.string,
};
