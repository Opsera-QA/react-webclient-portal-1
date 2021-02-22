import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

function ButtonTooltip({ innerText, placement, children, trigger }) {
  const renderTooltip = (message) => {
    return (
      <Tooltip id="button-tooltip">
        {message}
      </Tooltip>
    );
  }

  if (innerText == null) {
    return children;
  }

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(innerText)}
      trigger={trigger}
    >
      {children}
    </OverlayTrigger>
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

export default ButtonTooltip;


