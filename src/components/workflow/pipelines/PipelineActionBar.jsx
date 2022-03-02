import React from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {
  faTrash,
  faQuestion, faCalendarDay, faShareAlt, faCog, faRedo, faUnlink, faExclamation, faFlag
} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Wire up functions
function PipelineActionBar({pipeline, handleShareClick, handleScheduleClick, handleHelpClick, handleSettingsClick, handleRedoClick, handleDeleteClick, handleUnlinkClick}) {

  // TODO: Be sure to add pointer and enable hover color when wiring up functions
  return (
    <>
        <div className="action-bar p-0 my-auto">
          {handleDeleteClick && <OverlayTriggerWrapper message={`Delete this Pipeline`}>
            <IconBase icon={faTrash} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleDeleteClick()}/>
          </OverlayTriggerWrapper>}
          {handleShareClick && <OverlayTriggerWrapper message={`Share this Pipeline`}>
            <IconBase icon={faShareAlt} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleShareClick()}/>
          </OverlayTriggerWrapper>}
          {handleScheduleClick && <OverlayTriggerWrapper message={`Schedule this Pipeline`}>
            <IconBase icon={faCalendarDay} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleScheduleClick()}/>
          </OverlayTriggerWrapper>}
          {handleHelpClick && <OverlayTriggerWrapper message={`Help`}>
            <IconBase icon={faQuestion} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleHelpClick()}/>
          </OverlayTriggerWrapper>}
          {handleSettingsClick && <OverlayTriggerWrapper message={`Configure This Pipeline`}>
            <IconBase icon={faCog} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleSettingsClick()}/>
          </OverlayTriggerWrapper>}
          {handleRedoClick && <OverlayTriggerWrapper message={`Rerun This Pipeline`}>
            <IconBase icon={faRedo} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleRedoClick()}/>
          </OverlayTriggerWrapper>}
          {handleUnlinkClick && <OverlayTriggerWrapper message={`Unlink This Pipeline`}>
            <IconBase icon={faUnlink} className={"pipeline-text float-right ml-3"} onClickFunction={() => handleUnlinkClick()}/>
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