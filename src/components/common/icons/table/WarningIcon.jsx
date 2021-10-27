import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function WarningIcon() {
  return (
    <TooltipWrapper innerText={"Unstable"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon icon={faCircle} className="cell-icon yellow fa-md" />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default WarningIcon;