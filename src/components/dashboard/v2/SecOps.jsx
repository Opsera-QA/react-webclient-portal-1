import React from "react";
import PropTypes from "prop-types";
import CodeView_Developer from "../../analytics/views/secops/codeView_developer";
import CodeView_Manager from "../../analytics/views/secops/codeView_manager";
import CodeView_Executive from "../../analytics/views/secops/codeView_executive";

function SecOpsDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <CodeView_Developer persona={persona} />;

  case "manager":
    return <CodeView_Manager persona={persona} />;

  case "executive":
    return <CodeView_Executive persona={persona} />;

  default:
    return <CodeView_Developer persona={persona} />;
  }  
}


SecOpsDashboard.propTypes = {
  persona: PropTypes.string
};

export default SecOpsDashboard;
