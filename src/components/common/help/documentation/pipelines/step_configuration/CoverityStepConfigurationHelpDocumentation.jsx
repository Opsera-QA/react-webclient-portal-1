import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function CoverityStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Utilize Coverity Integration in Opsera to identify critical software quality defects and security vulnerabilities in code. Provide client side thresholds and pipeline will use the values to determine the final status of the step. After the scan, view the Coverity  Execution Summary in Pipeline Logs &gt; Report for vulnerability details according to severity of impact. For more detailed information view the <a href="https://docs.opsera.io/quality-and-security-scan/coverity-integration" target="_blank" rel="noreferrer"><b>Coverity Integration Help Documentation</b>. </a>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Coverity Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(CoverityStepConfigurationHelpDocumentation);