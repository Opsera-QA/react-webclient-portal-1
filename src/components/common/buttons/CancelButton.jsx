import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Change isLoading to disabled
function CancelButton({
  isLoading,
  cancelFunction,
  size,
  className,
  buttonText,
}) {
  return (
    <div className={className}>
      <Button
        size={size}
        variant="secondary"
        disabled={isLoading}
        onClick={() => cancelFunction()}
        className={"w-100"}
      >
        <span>
          <IconBase
            icon={faTimes}
            className="mr-1"
          />
          {buttonText}
        </span>
      </Button>
    </div>
  );
}

CancelButton.propTypes = {
  cancelFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  buttonText: PropTypes.string,
};

CancelButton.defaultProps = {
  size: "sm",
  buttonText: "Cancel",
};

export default CancelButton;
