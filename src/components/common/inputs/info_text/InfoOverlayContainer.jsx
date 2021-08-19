import React from "react";
import PropTypes from "prop-types";
import {Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";

export const getInfoOverlay = (title, children) => {
  return (
    <>
      {getPopoverTitle(title)}
      <Popover.Content>
        <div>
          {children}
        </div>
      </Popover.Content>
    </>
  );
};

export const getPopoverTitle = (title) => {
  if (title) {
    return (
      <Popover.Title as="h3" className="popover-title">
        <div className={"d-flex justify-content-between"}>
          <div>
            {title}
          </div>
          <div>
            <FontAwesomeIcon icon={faTimes} className="pointer" onClick={() => {document.body.click();}}/>
          </div>
        </div>
      </Popover.Title>
    );
  }
};

function InfoOverlayContainer({ title, children, maxWidth }) {
  return (getInfoOverlay(title, children, maxWidth));
}

InfoOverlayContainer.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
};

export default InfoOverlayContainer;


