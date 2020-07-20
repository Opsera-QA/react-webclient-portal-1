import React from "react";
import PropTypes from "prop-types";
import SourceCodeView_developer from "../../analytics/views/SourceCodeView_developer";
import SourceCodeView_manager from "../../analytics/views/SourceCodeView_manager";
import SourceCodeView_executive from "../../analytics/views/SourceCodeView_executive";

function SecOpsDashboard( { persona, date } ) {
  
  switch (persona) {
  case "developer":
    return <SourceCodeView_developer persona={persona} date={date} />;

  case "manager":
    return <SourceCodeView_manager persona={persona} date={date} />;

  case "executive":
    return <SourceCodeView_executive persona={persona} date={date} />;

  default:
    return <SourceCodeView_developer persona={persona} date={date} />;
  }  
}


SecOpsDashboard.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object  
};

export default SecOpsDashboard;
