import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";

function NewRecordButton({ isLoading, variant, addRecordFunction, type, size }) {
  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <Button variant={variant} size={size} disabled={isLoading} onClick={() => {addRecordFunction();}}>
      <span><FontAwesomeIcon icon={faPlus} className="mr-1" fixedWidth/>New {type}</span>
    </Button>
  );
}

NewRecordButton.propTypes = {
  addRecordFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string
};

NewRecordButton.defaultProps = {
  size: "sm"
};

export default NewRecordButton;