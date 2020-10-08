import React, { useState } from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import { faShareSquare, faCopy, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import {faSearchPlus} from "@fortawesome/pro-regular-svg-icons";

// TODO: Note, please use the new component when ironed out going forward. We will create area specific summary bars, using SummaryActionBarContainer
function SummaryActionBar({itemName, itemId, backButtonPath, handleDuplicateClick, handleDeleteClick, handleActiveToggle, handleViewClick, handlePublishClick, handleDetailsClick, data, status}) {
  const history = useHistory();
  // TODO: Move to helper
  function renderTooltip(message) {
    return (
      <Tooltip id="button-tooltip">
        {message}
      </Tooltip>
    );
  }

  const handleBackButton = (path) => {
    history.push(path);
  }

  return (
    <>
        <div className="text-muted action-bar">
          {backButtonPath && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Go back")} >
            <span className="action-bar-icon pointer float-left ml-1"><FontAwesomeIcon icon={faArrowLeft} onClick={() => {handleBackButton(backButtonPath);}}/></span></OverlayTrigger> }
          {handleDetailsClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Show Details`)} >
            <span className="pointer float-right ml-3"><FontAwesomeIcon icon={faSearchPlus} onClick={() => {handleDetailsClick();}}/></span></OverlayTrigger> }
          {handleDeleteClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Delete this ${itemName}`)} >
            <span className="delete-icon pointer red float-right ml-3"><FontAwesomeIcon icon={faTrash} onClick={() => {handleDeleteClick(itemId);}}/></span></OverlayTrigger> }
          {handleDuplicateClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Duplicate this ${itemName} configuration`)} >
            <span className="pointer float-right ml-3"><FontAwesomeIcon icon={faCopy} onClick={() => {handleDuplicateClick(itemId);}}/></span></OverlayTrigger> }
          {handlePublishClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Publish this Pipeline to the shared Catalog`)} >
            <span className="pointer float-right ml-3"><FontAwesomeIcon icon={faShareSquare} onClick={() => {handlePublishClick(itemId);}}/></span></OverlayTrigger> }
          {handleViewClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`View ${itemName} Configurations`)} >
            <span className="action-bar-icon pointer float-right ml-3"><FontAwesomeIcon icon={faFileAlt} onClick={() => {handleViewClick(data);}}/></span></OverlayTrigger>}
          {handleActiveToggle && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`Toggle Current Status`)} >
            <span className="action-bar-icon pointer float-right ml-3" onClick={() => {handleActiveToggle();}}><FontAwesomeIcon icon={status ? faToggleOn : faToggleOff} className={"mr-2" + (status ? " opsera-blue" : " dark-grey")}/>{status ? "Active" : "Inactive"}</span></OverlayTrigger>}
        </div>
        <div className="py-3" />
    </>
  );
}

SummaryActionBar.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  backButtonPath: PropTypes.string,
  handleActiveToggle: PropTypes.func,
  handleViewClick: PropTypes.func,
  handlePublishClick: PropTypes.func,
  handleDetailsClick: PropTypes.func,
  data: PropTypes.object,
  status: PropTypes.bool,
  itemName: PropTypes.string,
  itemId: PropTypes.string,
};

export default SummaryActionBar;