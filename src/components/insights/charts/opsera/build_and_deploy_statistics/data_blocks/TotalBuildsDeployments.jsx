import React from 'react';
import PropTypes from "prop-types";
import { faTools } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TotalBuildsDeployments({ displayValue, displayText }) {
  return (
    <div className="metric-box p-3 text-center">
      <div className="box-icon">
        <FontAwesomeIcon icon={ faTools }  fixedWidth className='mr-2' />
      </div>
      <div className="box-metric d-flex flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="font-weight-bold">{ displayValue }</div>
      </div>
      <div className="w-100 text-muted mb-1">{ displayText }</div>
    </div>
  );
}

TotalBuildsDeployments.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default TotalBuildsDeployments;
