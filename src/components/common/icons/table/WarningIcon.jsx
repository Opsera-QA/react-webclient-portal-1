import React from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function WarningIcon() {
  return (
    <TooltipWrapper innerText={"Unstable"}>
      <div>
        <div className="status-icon">
          <IconBase icon={faCircle} className={"cell-icon yellow fa-md"} />
        </div>
      </div>
    </TooltipWrapper>
  );
}

export default WarningIcon;