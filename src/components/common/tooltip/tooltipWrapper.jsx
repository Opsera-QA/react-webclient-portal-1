import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";

function TooltipWrapper({ innerText, children }) {
  
  const getPopover = (innerText) => {
    return (
    <Popover id="popover-basic">
      <Popover.Content>
        {innerText}
      </Popover.Content>
    </Popover>
    );
  };

  return (
    <>
      <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={getPopover(innerText)}>
        {children}
      </OverlayTrigger>
    </>
  );
}

TooltipWrapper.propTypes = {
  innerText: PropTypes.string
};

export default TooltipWrapper;


