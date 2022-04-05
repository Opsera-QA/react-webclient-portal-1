import React from "react";
import PropTypes from "prop-types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import ExternalApiIntegratorEndpointsPanel
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointsPanel";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

function ToolEndpointsPanel({toolModel}) {
  const getPathsPanel = () => {
    switch (toolModel?.getData("tool_identifier")) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_API_INTEGRATOR:
        return (
          <ExternalApiIntegratorEndpointsPanel
            toolModel={toolModel}
            toolId={toolModel?.getData("_id")}
          />
        );
      default:
        return (
          <CenteredContentWrapper>
            <div className={"my-5"}>Opsera endpoint management is not currently available for this tool.</div>
          </CenteredContentWrapper>
        );
    }
  };

  if (toolModel == null) {
    return null;
  }

  return (
    <div>
      {getPathsPanel()}
    </div>
  );
}

ToolEndpointsPanel.propTypes = {
  toolModel: PropTypes.object,
};


export default ToolEndpointsPanel;
