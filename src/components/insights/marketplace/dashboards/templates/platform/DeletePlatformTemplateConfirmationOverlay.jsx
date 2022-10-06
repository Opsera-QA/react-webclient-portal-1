import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DeleteOverlayBase from "components/common/overlays/center/delete/DeleteOverlayBase";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import {
  platformDashboardTemplateActions
} from "components/insights/marketplace/dashboards/templates/platform/platformDashboardTemplate.actions";

export default function DeletePlatformTemplateConfirmationOverlay(
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
    isOpseraAdministrator,
  } = useComponentStateReference();

  const handleDeleteFunction = async () => {
    try {
      setDeleteState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await platformDashboardTemplateActions.deleteTemplate(
        getAccessToken,
        cancelTokenSource,
        dashboardId,
      );
      toastContext.showSystemSuccessToast("Successfully Deleted Platform Dashboard Template");
      setDeleteState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      loadData();
      toastContext.clearOverlayPanel();
    } catch (error) {
      if (isMounted?.current === true) {
        setDeleteState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showDeleteFailureResultDialog("Platform Dashboard Template", error);
      }
    }
  };

  if (isMongoDbId(dashboardId) !== true || isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DeleteOverlayBase
      objectType={"Platform Dashboard Template"}
      deleteState={deleteState}
      handleDeleteFunction={handleDeleteFunction}
    />
  );
}

DeletePlatformTemplateConfirmationOverlay.propTypes = {
  dashboardId: PropTypes.string,
  loadData: PropTypes.func,
};


