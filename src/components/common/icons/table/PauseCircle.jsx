import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";

function ArrowCircleDown() {
  return (
    <TooltipWrapper innerText={"Same as Earlier"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faPauseCircle}
            style={{ marginLeft: 15 }}
            className="cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default ArrowCircleDown;
