import React from "react";
import PropTypes from "prop-types";
import {Col, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function TooltipWrapper({ innerText, placement, children, title }) {
  const getPopoverTitle = () => {
    if (title) {
      return (
        <Popover.Title as="h3" className="filter-title">
          <Row>
            <Col sm={10} className="my-auto">{title}</Col>
            <Col sm={2} className="text-right">
              <FontAwesomeIcon
                icon={faTimes}
                className="pointer"
                onClick={() => {
                  document.body.click();
                }}
              />
            </Col>
          </Row>
        </Popover.Title>
      );
    }
  };

  const getPopover = (innerText) => {
    return (
      <Popover id="popover-basic">
        {getPopoverTitle()}
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
  placement: PropTypes.string,
  title: PropTypes.string
};

TooltipWrapper.defaultProps = {
  placement: "top"
};

export default TooltipWrapper;


