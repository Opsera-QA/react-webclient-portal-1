import React from "react";
import PropTypes from "prop-types";
import ConsoleLogOverlay from "components/common/overlays/log/ConsoleLogOverlay";

function ToolRegistryConnectionLogOverlay({ handleCloseFunction, logs }) {
  const formatData = () => {
    if (Array.isArray(logs)) {
      return (
        {logs}
      );
    }
  };

  if (!Array.isArray(logs)) {
    return null;
  }

  return (
    <ConsoleLogOverlay
      handleCloseFunction={handleCloseFunction}
      body={formatData()}
    />
  );
}
ToolRegistryConnectionLogOverlay.propTypes = {
  handleCloseFunction: PropTypes.func.isRequired,
  logs: PropTypes.array,
};

export default ToolRegistryConnectionLogOverlay;