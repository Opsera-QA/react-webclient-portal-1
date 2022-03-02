import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function NewRecordButton({ isLoading, variant, addRecordFunction, type, size, className, disabled }) {
  if (!addRecordFunction) {
    return <></>;
  }

  return (
    <div className={className}>
      <Button variant={variant} size={size} disabled={isLoading || disabled === true} onClick={() => {addRecordFunction();}}>
        <span className={"d-xl-none"}><IconBase icon={faPlus}/></span>
        <span className={"d-none d-xl-inline"}><IconBase icon={faPlus} className={"mr-1"}/>New {type}</span>
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