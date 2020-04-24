import React from "react";
import PropTypes from "prop-types";
import TestView_Developer from "../../analytics/views/quality/testView_developer";
import TestView_Manager from "../../analytics/views/quality/testView_manager";
import TestView_Executive from "../../analytics/views/quality/testView_executive";

function QualityDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <TestView_Developer persona={persona} />;

  case "manager":
    return <TestView_Manager persona={persona} />;

  case "executive":
    return <TestView_Executive persona={persona} />;

  default:
    return <TestView_Developer persona={persona} />;
  }  
}


QualityDashboard.propTypes = {
  persona: PropTypes.string
};

export default QualityDashboard;



