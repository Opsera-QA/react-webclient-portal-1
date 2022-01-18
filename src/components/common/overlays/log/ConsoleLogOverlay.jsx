import React from "react";
import PropTypes from "prop-types";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function ConsoleLogOverlay({ handleCloseFunction, body}) {
  const getCloseButton = () => {
    if (handleCloseFunction) {
      return (
        <div style={{minHeight: "15px"}}>
          <div className="text-right float-right">
            <IconBase
              icon={faTimes}
              onClickFunction={handleCloseFunction}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="console-text workflow-tool-activity-container">
      {getCloseButton()}
      <div className="workflow-tool-activity-window">
        {body}
      </div>
    </div>
  );
}

ConsoleLogOverlay.propTypes = {
  handleCloseFunction: PropTypes.func,
  body: PropTypes.any,
};

export default ConsoleLogOverlay;


