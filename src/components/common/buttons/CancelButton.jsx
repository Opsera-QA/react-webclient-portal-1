import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import  {faTimes} from "@fortawesome/free-solid-svg-icons";

function CancelButton({isLoading, cancelFunction, size}) {

  return (
    <div>
      <Button size={size} variant="secondary" disabled={isLoading} onClick={() => cancelFunction()}>
        <span><FontAwesomeIcon icon={faTimes} className="mr-2" fixedWidth/>Cancel</span>
      </Button>
    </div>
  );
}

CancelButton.propTypes = {
  cancelFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.string
};

CancelButton.defaultProps = {
  size: "sm"
}

export default CancelButton;