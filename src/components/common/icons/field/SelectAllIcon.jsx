import React from "react";
import PropTypes from "prop-types";
import {faPlus} from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function SelectAllIcon(
  {
    selectAllFunction,
    className,
    disabled,
  }) {
  if (selectAllFunction == null || disabled === true) {
    return null;
  }

  return (
    <div className={className}>
      <div onClick={() => selectAllFunction()} className={"badge badge-success pointer d-flex"}>
        <div className={"my-auto mr-1"}>
          <IconBase
            icon={faPlus}
            className={"mr-1"}
          />
          Select All
        </div>
      </div>
    </div>
  );
}

SelectAllIcon.propTypes = {
  selectAllFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};