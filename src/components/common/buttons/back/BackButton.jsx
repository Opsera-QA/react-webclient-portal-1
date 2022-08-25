import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepBackward} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function BackButton(
  {
    isLoading,
    variant,
    backButtonFunction,
    size,
    className,
    icon,
  }) {
  if (backButtonFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button size={size} variant={variant} disabled={isLoading} onClick={() => backButtonFunction()}>
        <span><IconBase icon={icon} className={"mr-2"} fixedWidth/>Back</span>
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
};

BackButton.defaultProps = {
  size: "sm",
  variant: "secondary",
  icon: faStepBackward,
};