import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function UnchangedMetricIcon({noPad}) {
  return (
    <TooltipWrapper innerText={"Same as Earlier"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faPauseCircle}
            style={ noPad !== false ? { marginLeft: 15 } : {}}
            className={"cell-icon vertical-align-item"}
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

UnchangedMetricIcon.propTypes = {
  noPad: PropTypes.bool,
};

export default UnchangedMetricIcon;
