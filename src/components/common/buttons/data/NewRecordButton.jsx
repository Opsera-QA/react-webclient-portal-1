import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";

function NewRecordButton({ isLoading, variant, addRecordFunction, type, size, className, disabled }) {
  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading || disabled === true} onClick={() => {addRecordFunction();}}>
        <span className={"d-xl-none"}><FontAwesomeIcon icon={faPlus} fixedWidth/></span>
        <span className={"d-none d-xl-inline"}><FontAwesomeIcon icon={faPlus} className="mr-1" fixedWidth/> New {type}</span>
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
  className: PropTypes.string,
  disabled: PropTypes.bool
};

NewRecordButton.defaultProps = {
  size: "sm"
};

export default NewRecordButton;