import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";

function NewRecordButton({ isLoading, variant, addRecordFunction, type, size, className }) {
  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading} onClick={() => {addRecordFunction();}}>
        <FontAwesomeIcon icon={faPlus} className="mr-1" fixedWidth/>
        <span className={"d-none d-xl-inline"}>New {type}</span>
      </Button>
    </div>
  );
}

NewRecordButton.propTypes = {
  addRecordFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

NewRecordButton.defaultProps = {
  size: "sm"
};

export default NewRecordButton;