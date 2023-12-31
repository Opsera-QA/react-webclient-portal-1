import React from "react";
import PropTypes from "prop-types";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

// TODO: When all action buttons are converted to this, use VanityButtonBase instead
export default function PipelineActionControlButtonBase(
  {
    tooltipText,
    variant,
    icon,
    onClickFunction,
    disabled,
    normalText,
    busyText,
    errorText,
    successText,
    buttonState,
    className,
    iconClassName,
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
    return buttonLabelHelper.getIconForState(
      icon,
      buttonState,
    );
  };

  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <ButtonTooltip
      innerText={tooltipText}
    >
      <Button
        disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY || disabled === true}
        onClick={onClickFunction}
        variant={getButtonVariant()}
        size={"sm"}
        className={className}
      >
          <span>
            <IconBase
              isLoading={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
              icon={getButtonIcon()}
              className={iconClassName}
            />
            {getLabel()}
          </span>
      </Button>
    </ButtonTooltip>
  );
}

PipelineActionControlButtonBase.propTypes = {
  tooltipText: PropTypes.string,
  variant: PropTypes.string,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  normalText: PropTypes.string,
  busyText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  buttonState: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

PipelineActionControlButtonBase.defaultProps = {
  className: "btn-default",
  iconClassName: "mr-2",
};
