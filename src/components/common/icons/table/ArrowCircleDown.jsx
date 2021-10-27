import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

function ArrowCircleDown() {
  return (
    <TooltipWrapper innerText={"Success"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faArrowCircleDown}
            style={{ marginLeft: 15 }}
            className="green cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default ArrowCircleDown;
