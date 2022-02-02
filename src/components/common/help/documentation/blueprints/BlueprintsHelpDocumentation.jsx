import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";



function BlueprintsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Pipeline Build Blueprints are consolidated logs of every stage in a pipeline. They can be exported back to a Jira ticket, pushed to S3 bucket or downloaded as PDF file for audit and compliance purposes. Blueprints can help to reduce the time during a pipeline failure and the manual hand off between Development, QA and Operations teams. To view detailed information on Blueprints, view the <a href="https://opsera.atlassian.net/wiki/spaces/OE/pages/594116609/Build+Blueprints?atlOrigin=eyJpIjoiMjEwNzA5NmMxZTU2NDgzYjllYmY5ODJiNDViM2UyYWUiLCJwIjoiYyJ9" target="_blank" rel="noreferrer"><b>Build Blueprints Documentation</b>.</a>
        <div className={"mt-2 ml-3"}>To view a single pipeline build blueprint or compare 2 blueprints side by side, select a pipeline and the run number from the dropdowns.
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Blueprints"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(BlueprintsHelpDocumentation);