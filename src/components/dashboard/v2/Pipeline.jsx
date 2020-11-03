import React from "react";
import PropTypes from "prop-types";
import BuildView_Developer from "../../analytics/views/pipeline/buildView_developer";
import BuildView_Manager from "../../analytics/views/pipeline/buildView_manager";
import BuildView_Executive from "../../analytics/views/pipeline/buildView_executive";

function PipelineDashboard({ persona, date, index }) {
  switch (persona) {
    case "developer":
      return <BuildView_Developer persona={persona} date={date} index={index} />;

    case "manager":
      return <BuildView_Manager persona={persona} date={date} index={index} />;

    case "executive":
      return <BuildView_Executive persona={persona} date={date} index={index} />;

    default:
      return <BuildView_Developer persona={persona} date={date} index={index} />;
  }
}

PipelineDashboard.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object,
  index: PropTypes.array,
};

export default PipelineDashboard;
