import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function DangerMetricIcon() {
  return (
    <TooltipWrapper innerText={"Risk"}>
      <div>
        <IconBase
          icon={faArrowCircleUp}
          iconClassName={"red cell-icon vertical-align-item"}
          className={"status-icon"}
        />
      </div>
    </TooltipWrapper>
  );
}

export default DangerMetricIcon;
