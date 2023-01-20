import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function BackButton(
  {
    isLoading,
    variant,
    backButtonFunction,
    size,
    className,
    icon,
    disabled,
  }) {
  if (backButtonFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        size={size}
        variant={variant}
        disabled={isLoading === true || disabled === true}
        onClick={() => backButtonFunction()}
      >
        <span>
          <IconBase
            icon={icon}
            className={"mr-2"}
          />
          Back
        </span>
      </Button>
    </div>
  );
}

BackButton.propTypes = {
  backButtonFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
};

BackButton.defaultProps = {
  size: "sm",
  variant: "secondary",
  icon: faArrowLeft,
};