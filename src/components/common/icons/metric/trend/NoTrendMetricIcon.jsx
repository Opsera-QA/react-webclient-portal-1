import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function NoTrendMetricIcon({noPad}) {
  return (
    <TooltipWrapper innerText={"No Trend"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faMinusCircle}
            style={ !noPad ? { marginLeft: 15 } : {}}
            className="cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}
NoTrendMetricIcon.propTypes = {
  noPad: PropTypes.boolean,
};
NoTrendMetricIcon.defaultProps = {
  noPad:false
};
export default NoTrendMetricIcon;
