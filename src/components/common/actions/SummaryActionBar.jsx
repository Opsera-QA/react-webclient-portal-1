import React, { useState } from "react";
import PropTypes from "prop-types";
import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faToggleOn, faToggleOff, faTrash, faArrowLeft, faFileAlt} from "@fortawesome/free-solid-svg-icons";

function SummaryActionBar({itemName, itemId, handleBackButton, handleDuplicateClick, handleDeleteClick, handleActiveToggle, handleViewClick, data, status}) {
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
            <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" onClick={() => {handleDeleteClick(itemId);}}/></OverlayTrigger> }
          {handleDuplicateClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Duplicate this ${itemName} configuration`)} >
            <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {handleDuplicateClick(itemId);}}/></OverlayTrigger> }
          {handleViewClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`View ${itemName} Configurations`)} >
            <FontAwesomeIcon icon={faFileAlt} className={"action-bar-icon pointer float-right ml-3" + (status ? " opsera-blue" : " dark-grey")} onClick={() => {handleViewClick(data);}}/></OverlayTrigger>}
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
  handleViewClick: PropTypes.func,
  data: PropTypes.object,
  status: PropTypes.bool,
  itemName: PropTypes.string,
  itemId: PropTypes.string,
};

export default SummaryActionBar;