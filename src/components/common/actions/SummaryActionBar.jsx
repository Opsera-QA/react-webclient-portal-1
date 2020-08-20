import React, { useState } from "react";
import PropTypes from "prop-types";
import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faToggleOn, faToggleOff, faTrash, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function SummaryActionBar({itemName, handleBackButton, handleDuplicateClick, handleDeleteClick, handleActiveToggle, status}) {
  // TODO: Move to helper
  function renderTooltip(message) {
    return (
      <Tooltip id="button-tooltip">
        {message}
      </Tooltip>
    );
  }

  return (
    <>
        <div className="text-muted action-bar mt-1">
          {handleBackButton && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Go back")} >
            <FontAwesomeIcon icon={faArrowLeft} className="action-bar-icon pointer float-left ml-1" onClick={() => {handleBackButton();}}/></OverlayTrigger> }
          {handleDeleteClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Delete this ${itemName}`)} >
            <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" onClick={() => {handleDeleteClick();}}/></OverlayTrigger> }
          {handleDuplicateClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Duplicate this ${itemName} configuration`)} >
            <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {handleDuplicateClick();}}/></OverlayTrigger> }
          {handleActiveToggle && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Toggle Current Status`)} >
            <FontAwesomeIcon icon={status ? faToggleOn : faToggleOff} className={"action-bar-icon pointer float-right ml-3" + (status ? " opsera-blue" : " dark-grey")} onClick={() => {handleActiveToggle();}}/></OverlayTrigger>}
        </div>
        <div className="py-3" />
    </>
  );
}

SummaryActionBar.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  handleBackButton: PropTypes.func,
  handleActiveToggle: PropTypes.func,
  status: PropTypes.bool,
  itemName: PropTypes.string,
};

export default SummaryActionBar;