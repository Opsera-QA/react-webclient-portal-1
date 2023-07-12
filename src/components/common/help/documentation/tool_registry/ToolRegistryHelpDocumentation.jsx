import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import AssignedRoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";
import SiteRoleAccessTable from "components/common/fields/access/table/SiteRoleAccessTable";
import registryToolRoles from "@opsera/know-your-role/roles/registry/tools/registryTool.roles";

function ToolRegistryHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>Opsera`s Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized location so you can integrate them into Opsera Pipelines. For information on individual tool configuration, view the <a href="https://docs.opsera.io/tool-registry" target="_blank" rel="noreferrer"><b>Opsera Tool Registry Help Documentation</b>.</a> </div>
        <div className={"mt-2 ml-2"}>
          <ul>
            <li>To manage or configure an <em>existing</em> tool, locate the tool using one of the following methods: <b>Filter by Tool</b> drop-down, search bar, or with filter icon (filter by <b>Active Status</b>, <b>Tool Owner</b>, or <b>Tag</b>), then click the tool.</li>
            <li>To create a <em>new</em> tool, click the <b>+New Tool</b> button. Select <b>Tool Creation Wizard</b> or <b>Advanced Settings</b> then locate the type of tool you wish to create and click the respective tool card. Provide basic tool information and click <b>Create</b>.</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Tool Registry"}
      helpDocumentation={getHelpDocumentation()}
    >
      <div className={"my-2"}>
        <AssignedRoleAccessTable
          roleAccessDefinitions={registryToolRoles}
        />
      </div>
      <div className={"my-2"}>
        <SiteRoleAccessTable
          roleAccessDefinitions={registryToolRoles}
        />
      </div>
    </HelpOverlayBase>
  );
}

export default React.memo(ToolRegistryHelpDocumentation);