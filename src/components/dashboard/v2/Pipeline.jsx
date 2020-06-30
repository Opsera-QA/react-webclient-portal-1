import React from "react";
import PropTypes from "prop-types";
import BuildView_Developer from "../../analytics/views/pipeline/buildView_developer";
import BuildView_Manager from "../../analytics/views/pipeline/buildView_manager";
import BuildView_Executive from "../../analytics/views/pipeline/buildView_executive";

function PipelineDashboard( { persona,  date } ) {
  
  switch (persona) {
  case "developer":
    return <BuildView_Developer persona={persona} date={date} />;

  case "manager":
    return <BuildView_Manager persona={persona} date={date}/>;

  case "executive":
    return <BuildView_Executive persona={persona} date={date}/>;

  default:
    return <BuildView_Manager persona={persona} date={date}/>;
  }   
}


PipelineDashboard.propTypes = {
  persona: PropTypes.string, 
  date: PropTypes.object
};

export default PipelineDashboard;
