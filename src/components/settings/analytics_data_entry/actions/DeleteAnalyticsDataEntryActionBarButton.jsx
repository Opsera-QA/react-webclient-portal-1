import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import {analyticsDataEntryHelper} from "components/settings/analytics_data_entry/analyticsDataEntry.helper";

export default function DeleteAnalyticsDataEntryActionBarButton(
  {
    analyticsDataEntryModel,
    className,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();

  const handleDeleteFunction = async () => {
    return await analyticsDataEntryModel.deleteModel();
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Analytics Data Entry"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(analyticsDataEntryHelper.getManagementScreenLink())}
      />
    );
  };

  if (analyticsDataEntryModel?.canDelete() !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showOverlayFunction}
      type={`Analytics Data Entry`}
      className={className}
    />
  );
}

DeleteAnalyticsDataEntryActionBarButton.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  className: PropTypes.string,
};
