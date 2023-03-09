import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";

export default function PipelinePausedWarningMessage({workflowStatus, className}) {

  if (workflowStatus !== "paused") {
    return null;
  }

  return (
    <TooltipWrapper
      innerText={"A paused pipeline requires a user to review and either approve or acknowledge completed actions in order to proceed."}
    >
      <div
        className={className}
        style={{cursor: "help"}}
      >
        <WarningMessageFieldBase
          showWarningLabel={false}
          className={"w-100"}
          message={"This pipeline is currently paused awaiting user response"}
        />
      </div>
    </TooltipWrapper>
  );
}

PipelinePausedWarningMessage.propTypes = {
  workflowStatus: PropTypes.string,
  className: PropTypes.string,
};
