import React from "react";
import PropTypes from "prop-types";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";

export default function VanityButtonBase(
  {
    buttonState,
    onClickFunction,
    icon,
    iconClassName,
    variant,
    disabled,
    className,
    normalText,
    busyText,
    successText,
    errorText,
    tooltip,
    buttonSize,
    buttonClassName,
    badgeText,
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

  const getCountBadge = () => {
    if (badgeText || badgeText === 0) {
     return (
       <div className={"badge badge-secondary ml-2"}>
         {badgeText}
       </div>
     );
    }
  };

  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonTooltip
        innerText={tooltip}
        buttonClassName={buttonClassName}
      >
        <Button
          disabled={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY || disabled === true}
          onClick={onClickFunction}
          variant={getButtonVariant()}
          size={buttonSize}
          className={buttonClassName}
        >
          <div className={"no-wrap-inline d-flex justify-content-between"}>
            <div>
              <IconBase
                isLoading={buttonState === buttonLabelHelper.BUTTON_STATES.BUSY}
                icon={getButtonIcon()}
                className={getLabel() != null ? "mr-2" : undefined}
                iconClassName={iconClassName}
              />
            </div>
            <div>
              {getLabel()}
            </div>
            <div>
              {getCountBadge()}
            </div>
          </div>
        </Button>
      </ButtonTooltip>
    </div>
  );
}

VanityButtonBase.propTypes = {
  buttonState: PropTypes.string,
  icon: PropTypes.object,
  iconClassName: PropTypes.string,
  onClickFunction: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  normalText: PropTypes.string,
  busyText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  tooltip: PropTypes.any,
  buttonSize: PropTypes.any,
  buttonClassName: PropTypes.string,
  badgeText: PropTypes.any,
};

VanityButtonBase.defaultProps = {
  buttonState: buttonLabelHelper.BUTTON_STATES.READY,
};
