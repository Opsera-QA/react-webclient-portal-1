import React, { useState } from "react";
import PropTypes from "prop-types";
import ValidateEndpointButton
  from "components/common/inputs/endpoints/endpoint/ValidateEndpointButton";
import StandaloneConsoleLogField from "components/common/fields/log/StandaloneConsoleLogField";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

// TODO: Build
function ValidateEndpointPanel(
  {
    endpoint,
    endpointId,
    toolId,
  }) {
  const [logs, setLogs] = useState([]);

  if (endpoint == null) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <StandaloneConsoleLogField
        consoleLog={logs}
        title={"Endpoint Validation Log"}
      />
      <ButtonContainerBase>
        <ValidateEndpointButton
          endpointId={endpointId}
          toolId={toolId}
          setLogs={setLogs}
        />
      </ButtonContainerBase>
    </div>
  );
}

ValidateEndpointPanel.propTypes = {
  endpoint: PropTypes.object,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
};

export default ValidateEndpointPanel;
