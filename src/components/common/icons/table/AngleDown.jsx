import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function AngleDown() {
  return (
    <TooltipWrapper innerText={"Success"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon icon={faAngleDown} className="cell-icon green fa-md" />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default AngleDown;
