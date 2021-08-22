import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faCode, faSpinner} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";

function PipelineStepDetailsContainer({ isLoading, children, title }) {
  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Pipeline Step</span>);
    }

    return (
      <div className="d-flex justify-content-between">
        <div><FontAwesomeIcon icon={faCode} fixedWidth className="mr-1"/>{title}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-2 makeup-tab-content-title">
        {getTitleBar()}
      </div>
      <div className={"m-2"}>
        {children}
      </div>
    </div>
  );
}


PipelineStepDetailsContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string,
};

export default PipelineStepDetailsContainer;