import React from "react";
import PropTypes from "prop-types";
import PlanningView_Developer from "../../analytics/views/planning/planningView_developer";
import PlanningView_Manager from "../../analytics/views/planning/planningView_manager";
import PlanningView_Executive from "../../analytics/views/planning/planningView_executive";

function PlanningDashboard( { persona,  date } ) {
  
  switch (persona) {
  case "developer":
    return <PlanningView_Developer persona={persona} date={date}/>;

  case "manager":
    return <PlanningView_Manager persona={persona} date={date}/>;

  case "executive":
    return <PlanningView_Executive persona={persona} date={date}/>;

  default:
    return <PlanningView_Developer persona={persona} date={date}/>;
  }  
}


PlanningDashboard.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default PlanningDashboard;
