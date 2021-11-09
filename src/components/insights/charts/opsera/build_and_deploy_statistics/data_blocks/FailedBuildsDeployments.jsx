import React from 'react';
import PropTypes from "prop-types";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FailedBuildsDeployments({ displayValue, displayText }) {
  return (
    <div className="metric-box p-3 text-center">
      <div className="box-icon">
        <FontAwesomeIcon icon={ faTimesCircle } fixedWidth className='mr-2 danger-red' />
      </div>
      <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="font-weight-bold danger-red">{ displayValue }</div>
      </div>
      <div className="w-100 danger-red mb-1 ">{ displayText }</div>
    </div>
  );
}

FailedBuildsDeployments.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default FailedBuildsDeployments;
