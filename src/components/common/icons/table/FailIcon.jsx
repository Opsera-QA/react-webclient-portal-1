import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function FailIcon() {
  return (
    <TooltipWrapper innerText={"Failure"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon icon={faTimes} className="cell-icon red fa-md" />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default FailIcon;