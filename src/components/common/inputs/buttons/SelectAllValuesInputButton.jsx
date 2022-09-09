import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function SelectAllValuesInputButton(
  {
    selectAllFunction,
    buttonText,
    visible,
    className,
  }) {
  if (selectAllFunction == null || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <div
        onClick={selectAllFunction}
        className={"d-flex badge badge-success clear-value-badge pointer"}
      >
        <span className={"my-auto"}>
          <IconBase icon={faTimes} className={"mr-1"} />
          {buttonText}
        </span>
      </div>
    </div>
  );
}

SelectAllValuesInputButton.propTypes = {
  selectAllFunction: PropTypes.func,
  buttonText: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

SelectAllValuesInputButton.defaultProps = {
  buttonText: "Select All",
};

