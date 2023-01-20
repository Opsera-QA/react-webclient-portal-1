import React from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DeleteCustomerDashboardTemplateConfirmationOverlay
  from "components/insights/marketplace/dashboards/templates/private/DeleteCustomerDashboardTemplateConfirmationOverlay";

export default function ActionBarDeleteCustomerDashboardTemplateButton(
  {
    dashboardId,
    ownerId,
    loadData,
    className,
  }) {
  const {
    toastContext,
    isSiteAdministrator,
    userData,
  } = useComponentStateReference();

  const showDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeleteCustomerDashboardTemplateConfirmationOverlay
        dashboardId={dashboardId}
        loadData={loadData}
      />
    );
  };

  if (
    isMongoDbId(dashboardId) !== true
    || isMongoDbId(ownerId) !== true
    || (isSiteAdministrator !== true && ownerId !== userData?._id)
  ) {
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

ActionBarDeleteCustomerDashboardTemplateButton.propTypes = {
  dashboardId: PropTypes.string,
  ownerId: PropTypes.string,
  loadData: PropTypes.func,
  className: PropTypes.string,
};