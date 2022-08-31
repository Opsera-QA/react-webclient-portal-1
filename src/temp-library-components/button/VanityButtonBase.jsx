import React, { useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { SALESFORCE_ORGANIZATION_TASK_WIZARD_SCREENS } from "components/tasks/wizard/organization_sync/SalesforceOrganizationSyncTaskWizardOverlay";
import taskActions from "components/tasks/task.actions";

export default function VanityButtonBase(
  {
    buttonState,
    onClickFunction,
    icon,
    variant,
    disabled,
    className,
    normalText,
    busyText,
    successText,
    errorText,
  }) {

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      buttonState,
      normalText,
      busyText,
      successText,
      errorText,
    );
  };

  const getButtonVariant = () => {
    return buttonLabelHelper.getVariantForState(
      variant,
      buttonState,
    );
  };

  const getButtonIcon = () => {
    return buttonLabelHelper.getVariantForState(
      icon,
      buttonState,
    );
  };

  if (onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY || disabled === true}
        onClick={onClickFunction}
        variant={getButtonVariant()}
      >
        <span>
          <IconBase
            isLoading={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
            icon={getButtonIcon()}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

VanityButtonBase.propTypes = {
  buttonState: PropTypes.string,
  icon: PropTypes.object,
  onClickFunction: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  normalText: PropTypes.string,
  busyText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
};

