import React from "react";
import PropTypes from "prop-types";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

function PipelineStepDetailsContainer({ isLoading, children, title }) {
  const getTitleBar = () => {
    if (isLoading) {
      return (<span><LoadingIcon className={"mr-1"}/>Loading Pipeline Step</span>);
    }

    return (
      <div className="d-flex justify-content-between">
        <div><IconBase icon={faCode} className={"mr-1"}/>{title}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-2 makeup-tab-content-title">
        {getTitleBar()}
      </div>
      <div>
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