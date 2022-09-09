import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function ClearSelectionInputButton(
  {
    clearValueFunction,
    buttonText,
    visible,
    className,
  }) {
  if (clearValueFunction == null || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <div
        onClick={clearValueFunction}
        className={"d-flex badge badge-danger clear-value-badge pointer"}
      >
        <span className={"my-auto"}>
          <IconBase icon={faTimes} className={"mr-1"} />
          {buttonText}
        </span>
      </div>
    </div>
  );
}

ClearSelectionInputButton.propTypes = {
  clearValueFunction: PropTypes.func,
  buttonText: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

ClearSelectionInputButton.defaultProps = {
  buttonText: "Clear Selection",
};

