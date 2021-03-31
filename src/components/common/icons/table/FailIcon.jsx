import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "../../../../theme.css";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function FailIcon() {
  return (
    <TooltipWrapper innerText={"Failure"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon icon={faCircle} className="cell-icon red fa-md" />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default FailIcon;