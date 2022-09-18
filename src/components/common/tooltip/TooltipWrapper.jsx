import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function TooltipWrapper(
  {
    innerText,
    placement,
    children,
    title,
    showCloseButton,
    className,
    overlayHeight,
    overlayWidth,
    trigger,
    delay,
    rootClose,
    wrapInDiv,
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

  const getPopover = () => {
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

  const getTooltip = () => {
    if (hasStringValue(innerText) === true && title == null) {
      return (
        <Tooltip id={"tooltip"}>
          {innerText}
        </Tooltip>
      );
    }

    return (getPopover());
  };

  const getBody = () => {
    if (wrapInDiv === true) {
      return (
        <div className={"tooltip-wrapper"}>
          {children}
        </div>
      );
    }

    return children;
  };

  if (innerText == null) {
    return children;
  }

  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      rootClose={rootClose}
      delay={delay}
      overlay={getTooltip()}
      // defaultShow={false}
    >
      {getBody()}
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
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  delay: PropTypes.object,
  rootClose: PropTypes.bool,
  wrapInDiv: PropTypes.bool,
};

TooltipWrapper.defaultProps = {
  placement: "top",
  className: "popover-container",
  trigger: ["hover", "focus"],
  delay: { show: 250, hide: 400 },
  rootClose: true,
};


