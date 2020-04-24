import React from "react";
import PropTypes from "prop-types";
import OperationsView_Developer from "../../analytics/views/operations/operationsView_developer";
import OperationsView_Manager from "../../analytics/views/operations/operationsView_manager";
import OperationsView_Executive from "../../analytics/views/operations/operationsView_executive";

function OperationsDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <OperationsView_Developer persona={persona} />;

  case "manager":
    return <OperationsView_Manager persona={persona} />;

  case "executive":
    return <OperationsView_Executive persona={persona} />;

  default:
    return <OperationsView_Developer persona={persona} />;
  }  
}


OperationsDashboard.propTypes = {
  persona: PropTypes.string
};

export default OperationsDashboard;
