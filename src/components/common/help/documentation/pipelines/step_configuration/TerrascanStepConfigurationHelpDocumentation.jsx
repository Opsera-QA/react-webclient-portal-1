import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function TerrascanStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Utilize Terrascan integration in Opsera pipelines to detect compliance and security violations across Infrastructure as Code and to mitigate risk before provisioning cloud native infrastructure. To view in depth documentation, view the <b><a href="https://docs.opsera.io/quality-and-security-scan/terrascan-integration" target="_blank" rel="noreferrer">Terrascan Integration Help Documentation</a></b> .
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Terrascan Step Configuration"}
    />
  );
}
export default React.memo(TerrascanStepConfigurationHelpDocumentation);