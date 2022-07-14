import React, { useState } from "react";
import PropTypes from "prop-types";
import ValidateEndpointButton
  from "components/common/inputs/endpoints/endpoint/ValidateEndpointButton";
import StandaloneConsoleLogField from "components/common/fields/log/StandaloneConsoleLogField";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import {
  EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS
} from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";

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

  // TODO: Instead we should put the validate button inside the title bar to save space.
  return (
    <div>
      <StandaloneConsoleLogField
        consoleLog={logs}
        title={"Endpoint Validation Log"}
        height={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.TEST_ENDPOINT_CONTAINER_HEIGHT}
        maxHeight={EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.TEST_ENDPOINT_CONTAINER_HEIGHT}
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
