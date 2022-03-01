import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Popover} from "react-bootstrap";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import IconBase from "components/common/icons/IconBase";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function PopoverContainer({ content, title, isLoading, children, className, showCloseButton }) {
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

  const getPopover = () => {
    return (
    <Popover id="popover-basic" className={className}>
      <PopoverTitle as="h3" className="popover-title">
        <div className={"d-flex justify-content-between"}>
          <div className="my-auto">{title}</div>
          {getCloseButton()}
        </div>
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
  children: PropTypes.any,
  showCloseButton: PropTypes.bool,
};

export default PopoverContainer;


