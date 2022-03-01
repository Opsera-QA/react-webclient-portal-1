import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Combine with PopoverContainer but make base component used by both
function TooltipWrapper(
  {
    innerText,
    placement,
    children,
    title,
    showCloseButton,
    className,
    overlayHeight,
    overlayWidth,
  }) {
  const getCloseButton = () => {
    if (showCloseButton !== false) {
      return (
        <div>
          <IconBase
            icon={faTimes}
            className={"pointer"}
            onClickFunction={() => {
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
      <Popover
        id="popover-basic"
        className={className}
        style={{
          minHeight: overlayHeight,
          minWidth: overlayWidth,
        }}
      >
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
    >
      {children}
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
  overlayHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  overlayWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TooltipWrapper.defaultProps = {
  placement: "top",
  className: "popover-container"
};

export default TooltipWrapper;


