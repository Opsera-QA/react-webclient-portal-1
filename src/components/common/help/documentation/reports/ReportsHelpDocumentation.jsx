import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function ReportsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>View all Tool, Tag and User Reports from this dashboard.
        <div className={"mt-2 ml-4"}>
          <h6>Tool Reports</h6>
          <ul>
            <li><b>Tools Used in Pipelines</b> - View which Pipelines use a specific Tool. </li>
            <li><b>Tool Counts</b> - View Tool usage counts.</li>
          </ul>
          <h6>Tag Reports</h6>
          <ul>
            <li><b>Tags Used in Pipelines</b> - View which Pipelines are in use by a specific Tag combination. </li>
            <li><b>Tags Used in Tools</b> - View which Tools are in use by a specific Tag combination.</li>
            <li><b>Tags Used in Dashboards</b> - View which Dashboards are in use by a specific Tag combination.</li>
          </ul>
          <h6>User Reports</h6>
          <ul>
            <li><b>Group Membership</b> - View the Group Membership of a selected User.</li>
            <li><b>Task Ownership</b> - View tasks owned by selected user.</li>
            <li><b>Pipeline Ownership</b> - View pipelines owned by selected user.</li>
            <li><b>User Report</b> - View report for selected user.</li>
            <li><b>Tool Ownership</b> - View tools owned by a selected user.</li>
          </ul>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Reports"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(ReportsHelpDocumentation);