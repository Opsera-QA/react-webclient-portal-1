import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function UnchangedMetricIcon() {
  return (
    <TooltipWrapper innerText={"Same as Earlier"}>
      <div>
        <IconBase
          icon={faPauseCircle}
          iconClassName={"cell-icon vertical-align-item"}
        />
      </div>
    </TooltipWrapper>
  );
}

export default UnchangedMetricIcon;
