import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function FailIcon() {
  return (
    <TooltipWrapper innerText={"Failure"}>
      <div>
        <div className="status-icon">
          <IconBase icon={faTimes} className={"cell-icon red fa-md"}/>
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default FailIcon;