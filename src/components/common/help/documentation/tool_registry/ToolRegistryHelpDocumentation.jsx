import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import PropTypes from "prop-types";
import RoleAccessTable from "components/common/fields/access/table/RoleAccessTable";

function ToolRegistryHelpDocumentation({registryToolRoleDefinitions}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-1"}>The Opsera Tool Registry allows you to register, track and configure all of the tools in your organization in one centralized location so you can integrate them into Opsera pipelines.  </div>
        <div className={"mt-2 ml-4"}><b>To create a new tool:</b>
          <ol>
            <li>Select the <b>+New Tool</b> button.</li>
            <li>Complete the <b>Create New Tool</b> form including required fields and any additional information.</li>
            <li>Select <b>Create</b> button to save the new tool, or to immediately add another, select the <b>Add Another</b> checkbox and proceed.</li>
          </ol>
          <div className={"mb-1"}><b>To view, edit or configure an existing tool:</b></div>
          <ol>
            <li>Easily locate your tool with the <b>Filter by Tool</b> dropdown, search bar, or by using the filter icon: filter by <b>Active Status</b>, <b>Tool Owner</b>, or <b>Tag</b>.</li>
            <li>Select <b>View</b>.</li>
          </ol></div>
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
        <RoleAccessTable
          roleAccessDefinitions={registryToolRoleDefinitions}
        />
      </div>
    </HelpOverlayBase>
  );
}

ToolRegistryHelpDocumentation.propTypes = {
  registryToolRoleDefinitions: PropTypes.object,
};

export default React.memo(ToolRegistryHelpDocumentation);