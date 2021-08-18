import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function ActiveLogTerminal({ handleClose, title, logs }) {
  const getCloseButton = () => {
    if (handleClose) {
      return (
        <div>
          <FontAwesomeIcon icon={faTimes} fixedWidth style={{cursor: "pointer"}} onClick={handleClose}/>
        </div>
      );
    }
  };

  // TODO: Style rows or put inside code field
  const getLogs = () => {
    if (Array.isArray(logs) && logs.length > 0) {
      return (logs);
    }
  };

  return (
    <>
      <div className="console-text workflow-tool-activity-container">
        <div className={"d-flex justify-content-between"}>
          <div>
            {title}
          </div>
          <div>
            {getCloseButton()}
          </div>
        </div>
        <div className="workflow-tool-activity-window">
          {getLogs()}
        </div>
      </div>
    </>
  );
}

ActiveLogTerminal.propTypes = {
  handleClose: PropTypes.func,
  logs: PropTypes.array,
  title: PropTypes.string,
};

export default ActiveLogTerminal;
