import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faUpload} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function ToggleUploadButton({ isLoading, uploadType, toggleUpload, variant, size, className }) {
  if (!toggleUpload) {
    return null;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading} onClick={() => {toggleUpload();}}>
        <span><IconBase icon={faUpload} className={"mr-1"}/>Upload {uploadType}</span>
      </Button>
    </div>
  );
}

ToggleUploadButton.propTypes = {
  isLoading: PropTypes.bool,
  toggleUpload: PropTypes.func,
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