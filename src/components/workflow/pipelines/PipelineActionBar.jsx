import React, { useState } from "react";
import PropTypes from "prop-types";
import {Button, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faQuestion, faCalendarDay, faShareAlt, faCog, faRedo, faUnlink, faExclamation, faFlag
} from "@fortawesome/free-solid-svg-icons";

// TODO: Wire up functions
function PipelineActionBar({pipeline, handleShareClick, handleScheduleClick, handleHelpClick, handleSettingsClick, handleRedoClick, handleDeleteClick, handleUnlinkClick}) {

  // TODO: Be sure to add pointer and enable hover color when wiring up functions
  return (
    <>
        <div className="action-bar p-0 my-auto">
          {handleDeleteClick && <OverlayTriggerWrapper message={`Delete this Pipeline`}>
            <FontAwesomeIcon icon={faTrash} className="pipeline-text float-right ml-3" onClick={() => handleDeleteClick()}/>
          </OverlayTriggerWrapper>}
          {handleShareClick && <OverlayTriggerWrapper message={`Share this Pipeline`}>
            <FontAwesomeIcon icon={faShareAlt} className="pipeline-text float-right ml-3" onClick={() => handleShareClick()}/>
          </OverlayTriggerWrapper>}
          {handleScheduleClick && <OverlayTriggerWrapper message={`Schedule this Pipeline`}>
            <FontAwesomeIcon icon={faCalendarDay} className="pipeline-text float-right ml-3" onClick={() => handleScheduleClick()}/>
          </OverlayTriggerWrapper>}
          {handleHelpClick && <OverlayTriggerWrapper message={`Help`}>
            <FontAwesomeIcon icon={faQuestion} className="pipeline-text float-right ml-3" onClick={() => handleHelpClick()}/>
          </OverlayTriggerWrapper>}
          {handleSettingsClick && <OverlayTriggerWrapper message={`Configure This Pipeline`}>
            <FontAwesomeIcon icon={faCog} className="pipeline-text float-right ml-3" onClick={() => handleSettingsClick()}/>
          </OverlayTriggerWrapper>}
          {handleRedoClick && <OverlayTriggerWrapper message={`Rerun This Pipeline`}>
            <FontAwesomeIcon icon={faRedo} className="pipeline-text float-right ml-3" onClick={() => handleRedoClick()}/>
          </OverlayTriggerWrapper>}
          {handleUnlinkClick && <OverlayTriggerWrapper message={`Unlink This Pipeline`}>
            <FontAwesomeIcon icon={faUnlink} className="pipeline-text float-right ml-3" onClick={() => handleUnlinkClick()}/>
          </OverlayTriggerWrapper>}
        </div>
    </>
  );
}

PipelineActionBar.propTypes = {
  pipeline: PropTypes.object,
  handleShareClick: PropTypes.func,
  handleScheduleClick: PropTypes.func,
  handleHelpClick: PropTypes.func,
  handleSettingsClick: PropTypes.func,
  handleRedoClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleUnlinkClick: PropTypes.func,
  status: PropTypes.bool,
  itemName: PropTypes.string,
};

// TODO: Combine with tooltipwrapper, if different
function OverlayTriggerWrapper({message, children}) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(message)} >
      {children}
    </OverlayTrigger>
  );
}

OverlayTriggerWrapper.propTypes = {
  children: PropTypes.any,
  message: PropTypes.any
};

// TODO: Move to helper
function renderTooltip(message) {
  return (
    <Tooltip id="button-tooltip">
      {message}
    </Tooltip>
  );
}

export default PipelineActionBar;