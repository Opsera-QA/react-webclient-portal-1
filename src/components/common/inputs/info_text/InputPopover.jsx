import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTimes} from "@fortawesome/pro-light-svg-icons";

function InputPopover({ tooltipBody, isLoading, trigger, tooltipTitle }) {
  const getPopoverTitle = () => {
    if (tooltipTitle) {
      return (
        <PopoverTitle as="h3" className="popover-title">
          <div className={"d-flex justify-content-between"}>
            <div>{tooltipTitle}</div>
            <div><FontAwesomeIcon icon={faTimes} className="pointer" onClick={() => { document.body.click();}} /></div>
          </div>
        </PopoverTitle>
      );
    }
  };

  const getPopover = () => {
    return (
    <Popover id="popover-basic" >
      {getPopoverTitle()}
      <Popover.Content>
        {tooltipBody}
      </Popover.Content>
    </Popover>
    );
  };

  return (
    <OverlayTrigger trigger={trigger} disabled={isLoading} rootClose placement="top" overlay={getPopover()}>
      <FontAwesomeIcon icon={faInfoCircle} className="mt-auto" />
    </OverlayTrigger>
  );
}

InputPopover.propTypes = {
  isLoading: PropTypes.bool,
  tooltipBody: PropTypes.object,
  tooltipTitle: PropTypes.string,
  trigger: PropTypes.any,
  title: PropTypes.string,
};

InputPopover.defaultProps = {
  trigger: ["hover", "focus"],
  tooltipTitle: "Field Details"
};

export default InputPopover;


