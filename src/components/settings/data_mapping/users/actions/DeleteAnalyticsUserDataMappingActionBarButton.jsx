import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {
  analyticsUserDataMappingHelper
} from "components/settings/data_mapping/users/analyticsUserDataMapping.helper";

export default function DeleteAnalyticsUserDataMappingActionBarButton(
  {
    analyticsUserDataMappingModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  const handleDeleteFunction = async () => {
    return await analyticsUserDataMappingModel.deleteModel();
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Analytics User Data Mapping"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(analyticsUserDataMappingHelper.getManagementScreenLink())}
      />
    );
  };

  if (analyticsUserDataMappingModel.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showOverlayFunction}
      type={"Analytics User Data Mapping"}
      className={className}
    />
  );
}

DeleteAnalyticsUserDataMappingActionBarButton.propTypes = {
  analyticsUserDataMappingModel: PropTypes.object,
  className: PropTypes.string,
};
