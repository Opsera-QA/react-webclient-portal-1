import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function TerraformStepConfigurationHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2 mb-2"}>Terraform integration allows user to run Terraform CLI (Command Line Interface) commands from Opsera Pipelines. In order to pass parameters using Terraform, a Parameter should be created in the Tool Registry. To view in depth documentation, view the <b><a href="https://docs.opsera.io/infrastructure-as-code/configure-terraform-cli" target="_blank" rel="noreferrer">Terraform CLI Help Documentation</a></b> .
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Terraform Step Configuration"}
    />
  );
}
export default React.memo(TerraformStepConfigurationHelpDocumentation);