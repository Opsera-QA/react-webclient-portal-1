import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faMinusCircle } from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function NoTrendMetricIcon() {
  return (
    <TooltipWrapper innerText={"Success"}>
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
