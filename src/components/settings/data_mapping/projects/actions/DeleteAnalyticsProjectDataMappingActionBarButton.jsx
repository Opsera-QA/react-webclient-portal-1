import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {
  analyticsProjectDataMappingHelper
} from "components/settings/data_mapping/projects/analyticsProjectDataMapping.helper";

export default function DeleteAnalyticsProjectDataMappingActionBarButton(
  {
    analyticsProjectDataMappingModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  const handleDeleteFunction = async () => {
    return await analyticsProjectDataMappingModel.deleteModel();
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Analytics Project Data Mapping"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(analyticsProjectDataMappingHelper.getManagementScreenLink())}
      />
    );
  };

  if (analyticsProjectDataMappingModel.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showOverlayFunction}
      type={"Analytics Project Data Mapping"}
      className={className}
    />
  );
}

DeleteAnalyticsProjectDataMappingActionBarButton.propTypes = {
  analyticsProjectDataMappingModel: PropTypes.object,
  className: PropTypes.string,
};
