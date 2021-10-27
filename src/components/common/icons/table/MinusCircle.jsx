import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function ArrowCircleDown() {
  return (
    <TooltipWrapper innerText={"No Trend"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faMinusCircle}
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
