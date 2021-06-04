import React, { useContext } from "react";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import HelpOverlayBase from "../../../overlays/center/help/HelpOverlayBase";

function ToolRegistryHelpDocumentation() {
    const toastContext = useContext(DialogToastContext);
    const closePanel = () => {
      toastContext.clearOverlayPanel();
    };
  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      titleText={"Tool Registry Help"}>
      <br></br>
      <div className={"mb-1"}><b>To create a new tool:</b></div>
      <div>1. Select <b>+New Tool</b>. </div>
      <div>2. Complete the  <b>Create New Tool</b> form including required fields and any additional information. </div>
      <div>3. Select <b>Create</b> to save new tool, or to immediately add another, select the <b>Add Another</b> checkbox and proceed.</div>
      <br></br>
      <div className={"mb-1"}><b>To view, edit or configure an existing tool:</b></div>
      <div>1. Easily locate your tool with <b>Filter by Tool</b> dropdown, the <b>Search</b> bar, or using the filter icon: filter by <b>Status</b>, <b>Tool Owner</b> or <b>Tag.</b></div>
      <div>2. Select <b>View</b>.</div>
    </HelpOverlayBase>
  );
}

export default React.memo(ToolRegistryHelpDocumentation);