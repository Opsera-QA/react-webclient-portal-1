import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function ButtonTooltip({ innerText, placement, children, trigger }) {
  if (innerText == null) {
    return children;
  }

  return (
    <TooltipWrapper
      placement={placement}
      trigger={trigger}
      innerText={innerText}
    >
      {children}
    </TooltipWrapper>
  );
}

ButtonTooltip.propTypes = {
  innerText: PropTypes.string,
  children: PropTypes.any,
  placement: PropTypes.string,
  trigger: PropTypes.array
};

ButtonTooltip.defaultProps = {
  placement: "top",
  trigger: ["hover", "focus"]
};


