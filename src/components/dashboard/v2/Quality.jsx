import React from "react";
import PropTypes from "prop-types";
import TestView_Developer from "../../analytics/views/quality/testView_developer";
import TestView_Manager from "../../analytics/views/quality/testView_manager";
import TestView_Executive from "../../analytics/views/quality/testView_executive";

function QualityDashboard( { persona, date } ) {
  
  switch (persona) {
  case "developer":
    return <TestView_Developer persona={persona} date={date}/>;

  case "manager":
    return <TestView_Manager persona={persona} date={date}/>;

  case "executive":
    return <TestView_Executive persona={persona} date={date}/>;

  default:
    return <TestView_Developer persona={persona} date={date}/>;
  }  
}


QualityDashboard.propTypes = {
  persona: PropTypes.string
};

export default QualityDashboard;



