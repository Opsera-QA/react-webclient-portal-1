import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/pro-light-svg-icons";

function AddNewRecordIcon({ addRecordFunction, className, type }) {
  if (addRecordFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"pointer"}>
        <FontAwesomeIcon onClick={() => {addRecordFunction();}} icon={faPlus} fixedWidth className={"mr-2"} />
        <span>Add New {type}</span>
      </div>
    </div>
  );
}

AddNewRecordIcon.propTypes = {
  addRecordFunction: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};

export default AddNewRecordIcon;