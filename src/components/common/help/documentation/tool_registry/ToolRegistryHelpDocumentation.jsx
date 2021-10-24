import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import PropTypes from "prop-types";
import AssignedRoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";
import SiteRoleAccessTable from "components/common/fields/access/table/SiteRoleAccessTable";

function ToolRegistryHelpDocumentation({registryToolRoleDefinitions}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>The Opsera Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized location so you can integrate them into Opsera pipelines. To view in depth documentation on the Tool Registry view the <a href="https://opsera.atlassian.net/l/c/xpBk71F0" target="_blank" rel="noreferrer"><b>Opsera Tool Registry Help Documentation</b>.</a> </div>
        <div className={"mt-2 ml-2"}><h5>Manage or configure an existing tool:</h5>
          <ol>
            <li>Easily locate your tool with the <b>Filter by Tool</b> dropdown, search bar, or by using the filter icon: filter by <b>Active Status</b>, <b>Tool Owner</b>, or <b>Tag</b>.</li>
            <li>Select <b>View</b>.</li>
          </ol>
          <div><h5>Create a new tool:</h5></div>
            <ol>
              <li>Select the <b>+New Tool</b> button.</li>
              <li>Locate the tool type from the options and click <b>Select Tool</b>.</li>
              <li>Complete the <b>Create New Tool</b> form including required fields and any additional information.</li>
              <li>Select <b>Create</b> button to save the new tool, or to immediately add another, select the <b>Add Another</b> checkbox and proceed.</li>
            </ol>
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
      {/*<div className={"my-2"}>*/}
      {/*  <AssignedRoleAccessTable*/}
      {/*    roleAccessDefinitions={registryToolRoleDefinitions}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className={"my-2"}>*/}
      {/*  <SiteRoleAccessTable*/}
      {/*    roleAccessDefinitions={registryToolRoleDefinitions}*/}
      {/*  />*/}
      {/*</div>*/}
    </HelpOverlayBase>
  );
}

ToolRegistryHelpDocumentation.propTypes = {
  registryToolRoleDefinitions: PropTypes.object,
};

export default React.memo(ToolRegistryHelpDocumentation);