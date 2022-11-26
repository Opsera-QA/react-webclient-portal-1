import React, {useState} from 'react';
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {
  platformDashboardTemplateActions
} from "components/insights/marketplace/dashboards/templates/platform/platformDashboardTemplate.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function AddPlatformPipelineButton(
  {
    disabled,
    dashboardTemplateId,
    className,
  }) {
  const [buttonState, setButtonState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  const addTemplateToDashboards = async () => {
    try {
      setButtonState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await platformDashboardTemplateActions.deployPlatformTemplate(
        getAccessToken,
        cancelTokenSource,
        dashboardTemplateId,
      );
      setButtonState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showCreateFailureResultDialog("Dashboard", error);
        setButtonState(buttonLabelHelper.BUTTON_STATES.ERROR);
      }
    }
  };

  if (isMongoDbId(dashboardTemplateId) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      buttonState={buttonState}
      variant={"secondary"}
      normalText={"Add To My Dashboards"}
      busyText={"Adding Dashboard"}
      errorText={"Failed To Add To Dashboards!"}
      successText={"Added To Dashboards!"}
      buttonSize={"sm"}
      disabled={disabled}
      onClickFunction={addTemplateToDashboards}
    />
  );
}

AddPlatformPipelineButton.propTypes = {
  dashboardTemplateId: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};