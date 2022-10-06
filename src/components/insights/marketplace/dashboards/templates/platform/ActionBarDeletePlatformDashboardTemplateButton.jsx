import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DeletePlatformTemplateConfirmationOverlay
  from "components/insights/marketplace/dashboards/templates/platform/DeletePlatformTemplateConfirmationOverlay";

export default function ActionBarDeletePlatformDashboardTemplateButton(
  {
    dashboardId,
    loadData,
    className,
  }) {
  const {
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const showDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeletePlatformTemplateConfirmationOverlay
        dashboardId={dashboardId}
        loadData={loadData}
      />
    );
  };

  if (isMongoDbId(dashboardId) !== true || isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showDeleteConfirmationOverlay}
      type={"Dashboard Template"}
      className={className}
    />
  );
}

ActionBarDeletePlatformDashboardTemplateButton.propTypes = {
  dashboardId: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};