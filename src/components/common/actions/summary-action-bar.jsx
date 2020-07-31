import React, { useState } from "react";
import PropTypes from "prop-types";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faTrash} from "@fortawesome/free-solid-svg-icons";

function SummaryActionBar({itemName, handleDuplicateClick, handleDeleteClick }) {
  // TODO: Move to helper
  function renderTooltip(props) {
    const { message } = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  return (
    <>
        <div className="mb-2 text-muted">
          {handleDeleteClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: `Delete this ${itemName}` })} >
            <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" onClick={() => {handleDeleteClick();}}/></OverlayTrigger> }
          {handleDuplicateClick && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: `Duplicate this ${itemName} configuration` })} >
            <FontAwesomeIcon icon={faCopy} className="pointer float-right ml-3" onClick={() => {handleDuplicateClick();}}/></OverlayTrigger> }
        </div>
        <div className="pt-1"><hr className="pt-1" /></div>
    </>
  );
}

SummaryActionBar.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  itemName: PropTypes.string,
};

export default SummaryActionBar;