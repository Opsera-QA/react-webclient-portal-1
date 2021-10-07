import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import  {faTimes} from "@fortawesome/free-solid-svg-icons";

// TODO: Change isLoading to disabled
function CancelButton({isLoading, cancelFunction, size, className}) {

  return (
    <Button size={size} variant="secondary" className={className} disabled={isLoading} onClick={() => cancelFunction()}>
      <span><FontAwesomeIcon icon={faTimes} className="mr-2" fixedWidth/>Cancel</span>
    </Button>
  );
}

CancelButton.propTypes = {
  cancelFunction: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  size: PropTypes.string
};

CancelButton.defaultProps = {
  size: "sm"
};

export default CancelButton;