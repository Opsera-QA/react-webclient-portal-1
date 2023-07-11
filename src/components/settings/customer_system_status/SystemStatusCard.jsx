import React  from "react";
import PropTypes from "prop-types";
import SystemStatusIcon from "../../common/status/SystemStatusIcon";

function SystemStatusCard({ systemStatus }) {

  const getStatusIcon = () => {
    switch (systemStatus.status) {
      case "Healthy":
        return <SystemStatusIcon type={"Healthy"}/>;
      case "Unhealthy":
        return <SystemStatusIcon type={"Unhealthy"}/>;
      default:
        return <SystemStatusIcon type={"Warning"}/>;
    }
  };

  return (
    <div className="statusCard">
      <span>{getStatusIcon()}{systemStatus.pod}</span>
    </div>
  );
}

SystemStatusCard.propTypes = {
  systemStatus: PropTypes.object
};

export default SystemStatusCard;