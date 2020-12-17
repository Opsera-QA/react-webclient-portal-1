import React from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import  {faTimes} from "@fortawesome/free-solid-svg-icons";

function CancelButton({isLoading, cancelFunction}) {

  return (
    <div className="d-flex">
      <Button size="sm" variant="secondary" disabled={isLoading} onClick={() => cancelFunction()}>
        <span><FontAwesomeIcon icon={faTimes} className="mr-2" fixedWidth/>Cancel</span>
      </Button>
    </div>
  );
}

CancelButton.propTypes = {
  cancelFunction: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CancelButton;