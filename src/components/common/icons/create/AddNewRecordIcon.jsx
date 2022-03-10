import React from "react";
import PropTypes from "prop-types";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function AddNewRecordIcon({ addRecordFunction, className, type }) {
  if (addRecordFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"pointer"}>
        <IconBase onClickFunction={() => {addRecordFunction();}} icon={faPlus} className={"mr-2"} />
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