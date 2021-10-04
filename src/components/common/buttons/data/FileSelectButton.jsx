import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/pro-light-svg-icons";

function FileSelectButton({ isLoading, customButtonText, type, disabled, handleClick, size, className }) {
  const getButtonText = () => {
    if (customButtonText != null) {
      return customButtonText;
    }

    if (type != null) {
      return (`Select ${type}`);
    }

    return (`Select File`);
  };

  if (handleClick == null) {
    return null;
  }

  return (
    <div className={className}>
      <Button size={size} variant="secondary" disabled={isLoading || disabled} onClick={() => handleClick()}>
        <span><FontAwesomeIcon icon={faFile} className="mr-1" fixedWidth/>{getButtonText()}</span>
      </Button>
    </div>
  );
}

FileSelectButton.propTypes = {
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  customButtonText: PropTypes.string,
};

FileSelectButton.defaultProps = {
  size: "md",
};

export default FileSelectButton;