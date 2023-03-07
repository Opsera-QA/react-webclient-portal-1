import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import AssignedRoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";
import SiteRoleAccessTable from "components/common/fields/access/table/SiteRoleAccessTable";
import scriptsLibrariesRoles from "@opsera/know-your-role/roles/registry/script_library/scriptsLibrary.roles";

function ScriptsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Scripts are utilized when the user has a large piece of code.
          Opsera Scripts Library enables user to register a new script, give it a name and apply RBAC.
          The script can then be referenced in a pipeline step.
        </div>
        <div className={"mt-2 ml-4"}><b>To create a new script:</b>
          <ol>
            <li>Select the <b>+New Script</b> button.</li>
            <li>Complete the <b>Create New Script</b> form including <b>Name</b>, <b>Language</b>, <b>Script</b> and apply any access rules.</li>
            <li>Select <b>Create</b> button to save the new script in the Opsera Scripts Library. The script can now be referenced in a pipeline.</li>
          </ol>
          <div className={"mb-1"}>For more detailed information on Script creation and how to configure a script in Opsera pipelines,
            view the  <a href="https://docs.opsera.io/tool-registry/scripts-creation" target="_blank" rel="noreferrer"><b>Scripts Creation Documentation</b>.</a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Scripts"}
      helpDocumentation={getHelpDocumentation()}
    >
      <div className={"my-2"}>
        <AssignedRoleAccessTable roleAccessDefinitions={scriptsLibrariesRoles} />
      </div>
      <div className={"my-2"}>
        <SiteRoleAccessTable roleAccessDefinitions={scriptsLibrariesRoles} />
      </div>
    </HelpOverlayBase>
  );
}

export default React.memo(ScriptsHelpDocumentation);