import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

function ButtonBase(
  {
    isLoading,
    onClickFunction,
    size,
    disabled,
    className,
    tooltipText,
    icon,
    variant,
    buttonText,
  }) {
  if (onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={tooltipText}>
        <div>
          <Button
            size={size}
            variant={variant}
            disabled={isLoading || disabled}
            onClick={onClickFunction}
          >
            <span>
              <IconBase
                isLoading={isLoading}
                icon={icon}
                className={hasStringValue(buttonText) === true ? "mr-2" : ""}
              />
              {buttonText}
            </span>
          </Button>
        </div>
      </TooltipWrapper>
    </div>
  );
}

ButtonBase.propTypes = {
  onClickFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
  icon: PropTypes.object,
  variant: PropTypes.string,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ButtonBase;