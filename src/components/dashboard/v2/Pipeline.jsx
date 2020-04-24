import React from "react";
import PropTypes from "prop-types";
import BuildView_Developer from "../../analytics/views/pipeline/buildView_developer";
import BuildView_Manager from "../../analytics/views/pipeline/buildView_manager";
import BuildView_Executive from "../../analytics/views/pipeline/buildView_executive";

function PipelineDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <BuildView_Developer persona={persona} />;

  case "manager":
    return <BuildView_Manager persona={persona} />;

  case "executive":
    return <BuildView_Executive persona={persona} />;

  default:
    return <BuildView_Manager persona={persona} />;
  }  
}


PipelineDashboard.propTypes = {
  persona: PropTypes.string
};

export default PipelineDashboard;
