import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";
import {analyticsDataEntryHelper} from "components/settings/analytics_data_entry/analyticsDataEntry.helper";
import useAnalyticsDataEntryActions from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryActions";

export default function DeleteAnalyticsDataEntryActionBarButton(
  {
    analyticsDataEntryModel,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const analyticsDataEntryActions = useAnalyticsDataEntryActions();

  const handleDeleteFunction = async () => {
    return await analyticsDataEntryActions.deleteAnalyticsDataEntryById(
      analyticsDataEntryModel?.getMongoDbId(),
    );
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

  if (AnalyticsDataEntryRoleHelper.canDeleteAnalyticsDataEntry(userData, analyticsDataEntryModel?.getOriginalData()) !== true) {
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
