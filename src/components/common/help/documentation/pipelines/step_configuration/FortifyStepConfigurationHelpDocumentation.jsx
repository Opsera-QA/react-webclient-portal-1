import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function FortifyStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Integrate Fortify tool in Opsera pipelines to perform vulnerabity scans, identifying security issues in your source code. Provide client side thresholds and pipeline will use the values to determine the final status of the step. For more detailed information on the Fortify workflow, view the <a href="https://docs.opsera.io/quality-and-security-scan/fortify-integration" target="_blank" rel="noreferrer"><b>Fortify Pipeline Help Documentation</b>. </a>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Fortify Step Configuration"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}
export default React.memo(FortifyStepConfigurationHelpDocumentation);