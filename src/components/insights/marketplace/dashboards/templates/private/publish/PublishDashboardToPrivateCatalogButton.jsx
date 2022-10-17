import React, { useState } from "react";
import PropTypes from "prop-types";
import { faShareSquare } from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  customerDashboardTemplateCatalogActions
} from "components/insights/marketplace/dashboards/templates/private/customerDashboardTemplateCatalog.actions";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function PublishDashboardToPrivateCatalogButton(
  {
    disabled,
    className,
    buttonSize,
    dashboardModel,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    cancelTokenSource,
    toastContext,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  const addDashboardToCustomerCatalog = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await customerDashboardTemplateCatalogActions.publishTemplateV2(
        getAccessToken,
        cancelTokenSource,
        dashboardModel?.getMongoDbId(),
        dashboardModel?.getData("roles"),
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      toastContext.showFormSuccessToast(
        `Published Dashboard to your organization's Private Catalog`,
      );
      toastContext.removeInlineMessage();
      toastContext.clearOverlayPanel();
    } catch (error) {
      if (isMounted?.current === true) {
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(
          error,
          `Error Publishing Dashboard to your organization's Private Catalog:`,
        );
      }
    }
  };

  if (dashboardModel?.canPublishDashboardToPrivateCatalog() !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      icon={faShareSquare}
      disabled={disabled}
      onClickFunction={addDashboardToCustomerCatalog}
      buttonSize={buttonSize}
      buttonState={buttonState}
      normalText={"Publish Dashboard to Private Catalog"}
      errorText={"Failed to Publish Dashboard to Private Catalog"}
      successText={"Successfully Published Dashboard to Private Catalog"}
      busyText={"Publishing Dashboard to Private Catalog"}
    />
  );
}

PublishDashboardToPrivateCatalogButton.propTypes = {
  dashboardModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonSize: PropTypes.string,
};