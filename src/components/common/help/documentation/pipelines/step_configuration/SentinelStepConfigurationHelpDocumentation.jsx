import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function SentinelStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Sentinel integrates with Infrastructure as Code to enable logic-based policy decisions, and can be extended to use information from external sources. For more detailed information on the Sentinel workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/sentinal-policy-integration" target="_blank" rel="noreferrer"><b>Sentinel Policy Integration Help Documentation</b>. </a>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Sentinel Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(SentinelStepConfigurationHelpDocumentation);