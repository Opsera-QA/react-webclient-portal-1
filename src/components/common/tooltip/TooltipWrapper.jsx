import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";

function TooltipWrapper({ innerText, placement, children }) {

  const getPopover = (innerText) => {
    return (
      <Popover id="popover-basic">
        <Popover.Content>
          {innerText}
        </Popover.Content>
      </Popover>
    );
  };

  if (innerText == null) {
    return children;
  }

  return (
    <OverlayTrigger trigger={["hover", "focus"]} placement={placement} overlay={getPopover(innerText)}>
      {children}
    </OverlayTrigger>
  );
}

TooltipWrapper.propTypes = {
  innerText: PropTypes.any,
  children: PropTypes.any,
  placement: PropTypes.string
};

TooltipWrapper.defaultProps = {
  placement: "top"
};

export default TooltipWrapper;


