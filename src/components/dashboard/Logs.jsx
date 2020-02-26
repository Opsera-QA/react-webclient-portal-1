import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ActivityLogView from "../analytics/logs/activityLogView";


function LogsDashboard( { persona } ) {
  const [loading, setLoading] = useState(false);
  

  return (
    <>
      <div className="mt-3">
        <ActivityLogView persona={persona}  />
      </div>
    </>
  );
}

LogsDashboard.propTypes = {
  persona: PropTypes.string
};

export default LogsDashboard;