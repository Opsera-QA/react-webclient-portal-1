import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

// TODO: Combine with PopoverContainer but make base component used by both
function TooltipWrapper({ innerText, placement, children, title, showCloseButton, className }) {
  const getCloseButton = () => {
    if (showCloseButton !== false) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faTimes}
            className="pointer"
            onClick={() => {
              document.body.click();
            }}
          />
        </div>
      );
    }
  };

  const getPopoverTitle = () => {
    if (title) {
      return (
        <Popover.Title as="h3" className="filter-title">
          <div className={"d-flex justify-content-between"}>
            <div className="my-auto">{title}</div>
            {getCloseButton()}
          </div>
        </Popover.Title>
      );
    }
  };

  const getPopover = (innerText) => {
    return (
      <Popover id="popover-basic" className={className}>
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
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={placement}
      overlay={getPopover(innerText)}
      onToggle={(shown) => {console.log("popover should be shown: " + shown);}}
    >
      <div>
        {children}
      </div>
    </OverlayTrigger>
  );
}

TooltipWrapper.propTypes = {
  innerText: PropTypes.any,
  children: PropTypes.any,
  placement: PropTypes.string,
  title: PropTypes.string,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
};

TooltipWrapper.defaultProps = {
  placement: "top",
  className: "popover-container"
};

export default TooltipWrapper;


