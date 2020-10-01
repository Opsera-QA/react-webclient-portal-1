import React  from "react";
import PropTypes from "prop-types";
import SystemStatusIcon from "./SystemStatusIcon";

function StatusLegend() {
  return (
    <div className="d-flex w-100 d-inline-flex status-legend p-3">
      <div className="mr-auto"><SystemStatusIcon type="Healthy" className="mr-2" />Available</div>
      <div className="mx-auto"><SystemStatusIcon type="Warning" className="mr-2" />Something Went Wrong</div>
      <div className="ml-auto"><SystemStatusIcon type="Unhealthy" className="mr-2"/>Unavailable</div>
    </div>
  );
}

StatusLegend.propTypes = {
  color: PropTypes.string
};

export default StatusLegend;