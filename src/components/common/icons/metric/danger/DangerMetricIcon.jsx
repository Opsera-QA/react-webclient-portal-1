import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function DangerMetricIcon({noPad}) {
  return (
    <TooltipWrapper innerText={"Risk"}>
      <div>
        <div className="status-icon">
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            style={ !noPad ? { marginLeft: 15 } : {}}
            className="red cell-icon vertical-align-item"
            fixedWidth
          />
        </div>
      </div>
    </TooltipWrapper>
  );
}

DangerMetricIcon.propTypes = {
  noPad: PropTypes.boolean,
};
DangerMetricIcon.defaultProps = {
  noPad:false
};
export default DangerMetricIcon;
