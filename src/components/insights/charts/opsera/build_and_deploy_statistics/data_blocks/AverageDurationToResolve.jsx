import React from 'react';
import PropTypes from "prop-types";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AverageDurationToResolve({ displayValue, displayText }) {
  return (
    <div className="metric-box p-3 text-center">
      <div className="box-icon">
        <FontAwesomeIcon icon={ faClock } fixedWidth className='mr-2 danger-red' />
      </div>
      <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="font-weight-bold danger-red">{ displayValue }<span className="metric-box-subtext"> hrs</span></div>
      </div>
      <div className="w-100 danger-red mb-1 ">{ displayText }</div>
    </div>
  );
}

AverageDurationToResolve.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

AverageDurationToResolve.defaultProps = {
  displayText: "Average Duration to Resolve"
};

export default AverageDurationToResolve;
