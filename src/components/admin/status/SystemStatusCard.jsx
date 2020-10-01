import React  from "react";
import PropTypes from "prop-types";
import SystemStatusIcon from "../../common/status/SystemStatusIcon";

function SystemStatusCard({ systemStatus }) {

  const getStatusIcon = () => {
    switch (systemStatus.instance[0].status) {
      case "UP":
        return <SystemStatusIcon type={"Healthy"}/>;
      case "DOWN":
        return <SystemStatusIcon type={"Unhealthy"}/>;
      default:
        return <SystemStatusIcon type={"Warning"}/>;
    }
  }

  return (
    <div className="statusCard">
      <span>{getStatusIcon()}<span className="mt-2">{systemStatus.name}</span></span>
    </div>
  );
}

SystemStatusCard.propTypes = {
  systemStatus: PropTypes.object
};

export default SystemStatusCard;