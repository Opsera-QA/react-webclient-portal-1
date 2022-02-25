import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function NoTrendMetricIcon() {
  return (
    <TooltipWrapper innerText={"No Trend"}>
      <div>
        <IconBase
          icon={faMinusCircle}
          iconClassName={"cell-icon vertical-align-item"}
        />
      </div>
    </TooltipWrapper>
  );
}

export default NoTrendMetricIcon;
