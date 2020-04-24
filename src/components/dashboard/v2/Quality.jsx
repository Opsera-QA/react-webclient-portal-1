import React from "react";
import PropTypes from "prop-types";
import QualityView_Developer from "../../analytics/views/quality/qualityView_developer";
import QualityView_Manager from "../../analytics/views/quality/qualityView_manager";
import QualityView_Executive from "../../analytics/views/quality/qualityView_executive";

function QualityDashboard( { persona } ) {
  
  switch (persona) {
  case "developer":
    return <QualityView_Developer persona={persona} />;

  case "manager":
    return <QualityView_Manager persona={persona} />;

  case "executive":
    return <QualityView_Executive persona={persona} />;

  default:
    return <QualityView_Developer persona={persona} />;
  }  
}


QualityDashboard.propTypes = {
  persona: PropTypes.string
};

export default QualityDashboard;
