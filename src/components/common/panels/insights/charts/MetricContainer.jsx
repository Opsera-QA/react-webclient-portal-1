import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner, faTh} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";

function MetricContainer({ isLoading, children, title, addedClass }) {
  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Metric</span>);
    }

    return (
      <div className="d-flex justify-content-between">
        <div><FontAwesomeIcon icon={faTh} fixedWidth className="mr-1"/>{title}</div>
      </div>
    );
  };

  return (
    <div className= {`${addedClass} content-container content-card-1`}>
      <div className="px-2 content-block-header-inverse title-text-header-2">
        {getTitleBar()}
      </div>
      <div style={{padding: 0}} className={"new-chart m-2 shaded-panel"}>
        {children}
      </div>
    </div>
  );
}


MetricContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string,
  addedClass: PropTypes.string
};

export default MetricContainer;