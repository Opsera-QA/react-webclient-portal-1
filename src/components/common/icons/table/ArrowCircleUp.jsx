import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

function ArrowCircleUp() {
  return (
    <TooltipWrapper innerText={"Risk"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            style={{ marginLeft: 15 }}
            className="red cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default ArrowCircleUp;
