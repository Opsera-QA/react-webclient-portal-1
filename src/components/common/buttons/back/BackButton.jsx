import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function BackButton({ isLoading, variant, backButtonFunction, size, className }) {
  if (backButtonFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button size={size} variant={variant} disabled={isLoading} onClick={() => backButtonFunction()}>
        <span><IconBase icon={faStepBackward} className={"mr-2"} fixedWidth/>Back</span>
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
};

BackButton.defaultProps = {
  size: "sm",
  variant: "secondary",
};

export default BackButton;