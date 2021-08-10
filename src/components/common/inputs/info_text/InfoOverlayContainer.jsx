import React from "react";
import PropTypes from "prop-types";
import {Popover} from "react-bootstrap";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

function InfoOverlayContainer({ title, body }) {
  const getPopoverTitle = () => {
    if (title) {
      return (
        <PopoverTitle as="h3" className="popover-title">
          <div className={"d-flex justify-content-between"}>
            <div>{title}</div>
            <div><FontAwesomeIcon icon={faTimes} className="pointer" onClick={() => { document.body.click();}} /></div>
          </div>
        </PopoverTitle>
      );
    }
  };

  return (
    <Popover id="popover-basic" >
      {getPopoverTitle()}
      <Popover.Content>
        {body}
      </Popover.Content>
    </Popover>
  );
}

InfoOverlayContainer.propTypes = {
  body: PropTypes.any,
  title: PropTypes.any,
};

export default InfoOverlayContainer;


