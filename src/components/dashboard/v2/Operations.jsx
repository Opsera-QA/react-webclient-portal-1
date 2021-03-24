import React from "react";
import PropTypes from "prop-types";
import OperationsView_Developer from "../../analytics/views/operations/operationsView_developer";
import OperationsView_Manager from "../../analytics/views/operations/operationsView_manager";
import OperationsView_Executive from "../../analytics/views/operations/operationsView_executive";

function OperationsDashboard( { persona, index } ) {
  
  switch (persona) {
  case "developer":
    return <OperationsView_Developer persona={persona} index={index}/>;

  case "manager":
    return <OperationsView_Manager persona={persona} index={index}/>;

  case "executive":
    return <OperationsView_Executive persona={persona} index={index}/>;

  default:
    return <OperationsView_Developer persona={persona} index={index}/>;
  }  
}


OperationsDashboard.propTypes = {
  persona: PropTypes.string,
  index: PropTypes.any
};

export default OperationsDashboard;
