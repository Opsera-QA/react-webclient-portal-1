import React from "react";
import PropTypes from "prop-types";
import PlanningView_Developer from "../../analytics/views/planning/planningView_developer";
import PlanningView_Manager from "../../analytics/views/planning/planningView_manager";
import PlanningView_Executive from "../../analytics/views/planning/planningView_executive";

function PlanningDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <PlanningView_Developer persona={persona} />;

  case "manager":
    return <PlanningView_Manager persona={persona} />;

  case "executive":
    return <PlanningView_Executive persona={persona} />;

  default:
    return <PlanningView_Developer persona={persona} />;
  }  
}


PlanningDashboard.propTypes = {
  persona: PropTypes.string
};

export default PlanningDashboard;
