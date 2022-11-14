import React from "react";
import PropTypes from "prop-types";
import {faRefresh} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function ReloadDataIcon(
  {
    loadDataFunction,
    disabled,
    className,
  }) {
  if (loadDataFunction == null || disabled === true) {
    return null;
  }

  return (
    <span className={className}>
      <span
        onClick={() => loadDataFunction()}
        className={"my-auto badge badge-secondary clear-value-badge pointer"}
      >
        <span className={"my-auto"}>
          <IconBase icon={faRefresh} className={"mr-1"}/>Reload Data</span>
      </span>
    </span>
  );
}

ReloadDataIcon.propTypes = {
  loadDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};