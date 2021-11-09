import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function SuccessMetricIcon({noPad}) {
  return (
    <TooltipWrapper innerText={"Success"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faArrowCircleDown}
            style={ noPad !== false ? { marginLeft: 15 } : undefined}
            className="green cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

SuccessMetricIcon.propTypes = {
  noPad: PropTypes.bool,
};

export default SuccessMetricIcon;
