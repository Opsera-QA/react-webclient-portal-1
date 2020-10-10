import React from "react";
import PropTypes from "prop-types";
import {Col, OverlayTrigger, Popover, Row} from "react-bootstrap";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";

function PopoverContainer({ content, title, isLoading, children, className }) {
  
  const getPopover = () => {
    return (
    <Popover id="popover-basic" className={className}>
      <PopoverTitle as="h3" className="popover-title">
        <Row>
          <Col sm={10} className="my-auto">{title}</Col>
          <Col sm={2} className="text-right">
            <FontAwesomeIcon
              icon={faTimes}
              className="pointer"
              onClick={() => { document.body.click();}}
            />
          </Col>
        </Row>
      </PopoverTitle>
      <Popover.Content>
        {content}
      </Popover.Content>
    </Popover>
    );
  };

  return (
    <OverlayTrigger trigger="click" disabled={isLoading} rootClose placement="bottom" overlay={getPopover()} className="filter-popover">
        {children}
    </OverlayTrigger>
  );
}

PopoverContainer.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.object,
  children: PropTypes.any
};

export default PopoverContainer;


