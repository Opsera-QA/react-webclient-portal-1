import React, { useEffect } from "react";
import PropTypes from "prop-types";
import JiraTicketsAssignedByUserBarChart from "../../analytics/charts/jiraTicketsAssignedByUserBarChart";
import JiraIssuesByPriorityBarChart from "../../analytics/charts/jiraIssuesByPriorityBarChart";

function PlanningDashboard( { persona } ){
  
  useEffect( () => {
    console.log("Persona: ", persona);
  }, [persona]);
  
  return (
    <>
      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <JiraTicketsAssignedByUserBarChart persona={persona} />
        </div> 
      </div>

      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <JiraIssuesByPriorityBarChart persona={persona} />
        </div> 
      </div>
      
    </>
  );
}


PlanningDashboard.propTypes = {
  persona: PropTypes.string
};


export default PlanningDashboard;

