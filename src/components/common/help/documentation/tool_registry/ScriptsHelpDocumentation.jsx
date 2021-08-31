import React, { useContext } from "react";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import HelpOverlayBase from "../../../overlays/center/help/HelpOverlayBase";

function ScriptsHelpDocumentation() {
    const toastContext = useContext(DialogToastContext);
    const closePanel = () => {
      toastContext.clearOverlayPanel();
    };
  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      titleText={"Scripts Help"}>
      <div className={"mt-3 ml-1"}>Scripts are utilized when the user has a large piece of code. Opsera Scripts Library enables user to register a new script, give it a name and apply RBAC. The script can then be referenced in the a pipeline step.</div>
      <div className={"mt-2 ml-4"}><b>To create a new script:</b>
        <ol>
          <li>Select the <b>+New Script</b> button.</li>
          <li>Complete the <b>Create New Script</b> form including <b>Name</b>, <b>Language</b>, <b>Script</b> and apply any access roles.</li>
          <li>Select <b>Create</b> button to save the new script in the Opsera Scripts Library. The script can now be referenced in a pipeline.</li>
        </ol>
      <div className={"mb-1"}>For more detailed information on Script creation and how to configure a script in Opsera pipelines, view the  <a href="https://opsera.atlassian.net/l/c/S2c72ieq" target="_blank" rel="noreferrer"><b>Script Library Help Documentation</b>.</a></div></div>
    </HelpOverlayBase>
  );
}

export default React.memo(ScriptsHelpDocumentation);