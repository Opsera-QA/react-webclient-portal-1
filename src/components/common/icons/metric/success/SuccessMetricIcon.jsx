import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function SuccessMetricIcon() {
  return (
    <TooltipWrapper innerText={"Success"}>
      <div>
        <IconBase
          icon={faArrowCircleDown}
          iconClassName={"green cell-icon vertical-align-item"}
        />
      </div>
    </TooltipWrapper>
  );
}

export default SuccessMetricIcon;
