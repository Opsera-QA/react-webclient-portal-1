import React from 'react';
import PropTypes from "prop-types";
import { faRocketLaunch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AverageDuration({ displayValue, displayText }) {
  return (        
    <div className="metric-box p-3 text-center">
      <div className="box-icon">
        <FontAwesomeIcon icon={ faRocketLaunch } fixedWidth className='mr-2 green' />
      </div>
      <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="font-weight-bold green">{ displayValue } <span className="metric-box-subtext"> mins</span></div>
      </div>
      <div className="w-100 green mb-1">{ displayText }</div>
    </div>
  );
}

AverageDuration.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

AverageDuration.defaultProps = {
  displayText: "Average Duration"
};

export default AverageDuration;
