import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner, faTimes} from "@fortawesome/pro-light-svg-icons";
import {Row} from "react-bootstrap";

function OverlayTitleBar({ titleText, titleIcon, isLoading, handleClose }) {
  const getTitleIcon = () => {
    if (titleIcon) {
      return (
        <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>
      );
    }
  };

  if (titleText == null) {
    return (
      <Row className="title-text-header-1 w-100 p-1 mx-0 bg-white">
        <FontAwesomeIcon className={"ml-auto dark-grey pointer"} icon={faTimes} fixedWidth onClick={() => { handleClose();}} />
      </Row>
    );
  }

  if (isLoading) {
    return (
      <div className="px-3 content-block-header title-text-header-1">
        <div className="d-flex justify-content-between">
          <div><span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span></div>
          <div className="pointer" onClick={() => { handleClose();}}>
            <FontAwesomeIcon icon={faTimes} fixedWidth/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 content-block-header title-text-header-1">
      <div className="d-flex justify-content-between">
        <div><span>{getTitleIcon()}{titleText}</span></div>
        <div className="pointer" onClick={() => { handleClose();}}>
          <FontAwesomeIcon icon={faTimes} fixedWidth/>
        </div>
      </div>
    </div>
  );
}


OverlayTitleBar.propTypes = {
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool
};

export default OverlayTitleBar;