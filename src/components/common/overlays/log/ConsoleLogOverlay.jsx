import React from "react";
import PropTypes from "prop-types";
import {faTimes, faSync} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function ConsoleLogOverlay(
  {
    handleCloseFunction,
    isLoading,
    loadDataFunction,
    body,
  }) {
  return (
    <div className={"console-text workflow-tool-activity-container"}>
      <div className={"d-flex w-100"}>
        <div className={"ml-auto"}>
          <IconBase
            className={"mr-2"}
            isLoading={isLoading}
            icon={faSync}
            onClickFunction={loadDataFunction}
            visible={loadDataFunction != null || isLoading === true}
          />
          <IconBase
            icon={faTimes}
            onClickFunction={handleCloseFunction}
            visible={handleCloseFunction != null}
          />
        </div>
      </div>
      <div className="workflow-tool-activity-window">
        {body}
      </div>
    </div>
  );
}

ConsoleLogOverlay.propTypes = {
  handleCloseFunction: PropTypes.func,
  body: PropTypes.any,
  loadDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
};
