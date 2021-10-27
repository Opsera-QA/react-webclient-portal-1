import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function AngleUp() {
  return (
    <TooltipWrapper innerText={"Risk"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon icon={faAngleUp} className="cell-icon red fa-md" />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default AngleUp;
