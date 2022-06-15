import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function ExternalApiIntegratorHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"mb-1 ml-2"}>
          The external API REST Integrator pipeline step utilized API endpoints, methods and authentication tokens from the External API Integrator tool to make a RESTful API call. For detailed documentation on Tool Registry and Pipeline configuration, view the <a href="https://opsera.atlassian.net/l/c/8DsyZ23d" target="_blank" rel="noreferrer"><b>External REST API Integration Documentation</b></a>.
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"External REST API Integration"}
    />
  );
}
export default React.memo(ExternalApiIntegratorHelpDocumentation);