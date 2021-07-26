import React, { useState, useEffect } from "react";
import { faTimes, faSpinner, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
function ToolRegisteryConnectionLogModal({ handleClose, data }) {
 
  return (
    <>
      <div className="console-text workflow-tool-activity-container">
        <div style={{ minHeight: "15px" }}>
          <div className="text-right float-right">
            <FontAwesomeIcon icon={faTimes} fixedWidth style={{ cursor: "pointer" }} onClick={handleClose} />
          </div>
        </div>
        <div className="workflow-tool-activity-window">
          {data && data.length > 0 ? data : <>Starting connection test of tool...</>}
        </div>
      </div>
    </>
  );
}
ToolRegisteryConnectionLogModal.propTypes = {
  handleClose : PropTypes.func.isRequired,
  data:PropTypes.array
  
};

ToolRegisteryConnectionLogModal.defaultProps = {
  data:[]
};
export default ToolRegisteryConnectionLogModal;