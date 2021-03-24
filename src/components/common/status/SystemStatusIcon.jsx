import React  from "react";
import PropTypes from "prop-types";

function SystemStatusIcon({ type }) {
  const getSystemStatusIcon = (color) => {
    return <svg className="mr-2" height="20" width="20"><circle cx="10" cy="10" r="10" fill={color} /></svg>;
  };

  if (type === "Healthy") {
    return getSystemStatusIcon("#28C940");
  }

  if (type === "Unhealthy") {
    return getSystemStatusIcon("#FF0000");
  }

  if (type === "Warning") {
    return getSystemStatusIcon("#ffbf00");
  }

  return (getSystemStatusIcon(type));
}

SystemStatusIcon.propTypes = {
  color: PropTypes.string
};

export default SystemStatusIcon;