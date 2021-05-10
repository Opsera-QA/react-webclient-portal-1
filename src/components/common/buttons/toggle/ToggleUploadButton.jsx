import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/pro-light-svg-icons";

function ToggleUploadButton({ isLoading, uploadType, toggleUpload, variant, size, className }) {
  if (!toggleUpload) {
    return null;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading} onClick={() => {toggleUpload();}}>
        <span><FontAwesomeIcon icon={faUpload} className="mr-1" fixedWidth/>Upload {uploadType}</span>
      </Button>
    </div>
  );
}

ToggleUploadButton.propTypes = {
  isLoading: PropTypes.bool,
  toggleUpload: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  uploadType: PropTypes.string.isRequired
};

ToggleUploadButton.defaultProps = {
  variant: "outline-primary",
  size: "sm"
};

export default ToggleUploadButton;