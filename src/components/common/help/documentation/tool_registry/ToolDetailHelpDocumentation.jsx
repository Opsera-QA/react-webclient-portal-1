import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function ToolDetailHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Register, track and configure your tool. Each tool contains tabs unique to its configuration needs. View the following list of commonly used tab details:</div>
          <div className={"mt-2"}>
            <ul style={{listStyleType: "none"}}>
              <li><b>Summary</b> - Includes information added upon tool creation such as Tool Name, Tool Identifier, Cost Center, Tags, Classification, Description and user Access Roles.</li>
              <li><b>Attributes</b> - Includes Organizations, Contacts, Licensing, Locations, Applications and Compliance.</li>
              <li><b>Vault</b> - Vault Management. Opsera secures tokens, passwords, and other sensitive information in a Hashicorp Vault Instance. By default, Opsera uses the vault instance that is spun up for the specific organization. Users have the option to choose whether to store information in the default Opsera provided vault or configure their own Hashicorp vault instance in the Tool Registry. This setting only applies to this tool. All other tools will use the Opsera provided default vault unless specified by the user. </li>
              <li><b>Connection</b> - Enter tool specific configuration information and test to see if connection succeeds. The settings applied will be used in pipelines.</li>
              <li><b>Repositories</b> - Add, modify or delete tool repositories. These repositories can be entered once and reused across the Opsera platform.</li>
              <li><b>Jobs</b> - Manage the tool jobs. Create settings for custom jobs to be triggered in Pipeline steps (when configuring a pipeline). These settings can be entered once and reused across the Opsera platform.</li>
              <li><b>Accounts</b> - Register account credentials in the tool for use in pipelines. Adding accounts here will make them available inside relevant Pipeline steps.</li>
              <li><b>Paths</b> - Specify the repository package path from which components can be retrieved in Salesforce Pipeline Wizard.</li>
              <li><b>Logs</b> - View log activity for actions performed against this tool. This includes creation or deletion of jobs and applications and account registration.</li>
              <li><b>Applications</b> - Create and manage applications in the tool.</li>
              <li><b>Usage</b> - View and navigate to all pipelines in which this tool is being used.</li>
            </ul>
          </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Tool Details"}
      helpDocumentation={getHelpDocumentation()}
    >

    </HelpOverlayBase>
  );
}


export default React.memo(ToolDetailHelpDocumentation);