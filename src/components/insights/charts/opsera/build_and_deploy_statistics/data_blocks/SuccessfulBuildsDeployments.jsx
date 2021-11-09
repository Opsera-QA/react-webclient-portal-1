import React from 'react';
import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SuccessfulBuildsDeployments({ displayValue, displayText }) {
  return (
    <div className="metric-box p-3 text-center">
      <div className="box-icon">
        <FontAwesomeIcon icon={ faCheckCircle } fixedWidth className='mr-2 green' />
      </div>
      <div className="box-metric d-flex flex-row" style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="font-weight-bold green">{ displayValue }</div>
      </div>
      <div className="w-100 green mb-1">{ displayText }</div>
    </div>
  );
}

SuccessfulBuildsDeployments.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default SuccessfulBuildsDeployments;
