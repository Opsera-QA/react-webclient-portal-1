import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteOverlayBase from "components/common/overlays/center/delete/DeleteOverlayBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  customerDashboardTemplateCatalogActions
} from "components/insights/marketplace/dashboards/templates/private/customerDashboardTemplateCatalog.actions";

export default function DeleteCustomerDashboardTemplateConfirmationOverlay(
  {
    dashboardId,
    loadData,
  }) {
  const [deleteState, setDeleteState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  const handleDeleteFunction = async () => {
    try {
      setDeleteState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await customerDashboardTemplateCatalogActions.deleteTemplate(
        getAccessToken,
        cancelTokenSource,
        dashboardId,
      );
      toastContext.showSystemSuccessToast("Successfully Deleted Customer Dashboard Template");
      setDeleteState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      loadData();
      toastContext.clearOverlayPanel();
    } catch (error) {
      if (isMounted?.current === true) {
        setDeleteState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showDeleteFailureResultDialog("Customer Dashboard Template", error);
      }
    }
  };

  if (isMongoDbId(dashboardId) !== true) {
    return null;
  }

  return (
    <DeleteOverlayBase
      objectType={"Customer Dashboard Template"}
      deleteState={deleteState}
      handleDeleteFunction={handleDeleteFunction}
    />
  );
}

DeleteCustomerDashboardTemplateConfirmationOverlay.propTypes = {
  dashboardId: PropTypes.string,
  loadData: PropTypes.func,
};


