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
      <div>View all Tag, Tool and User Reports from this dashboard.
        <div className={"mt-2"}>
          <h6>Tag Reports</h6>
          <ul style={{listStyleType: "none"}}>
            <li><b>Pipelines by Tags</b> - View which Pipelines are in use by a specific Tag combination. </li>
            <li><b>Dashboards by Tags</b> - View which Dashboards are in use by a specific Tag combination.</li>
            <li><b>Tools by Tags</b> - View which Tools are in use by a specific Tag combination.</li>
            <li><b>Projects by Tags</b> - View Projects based on selected Tags.</li>
          </ul>
          <h6>Tool Reports</h6>
          <ul style={{listStyleType: "none"}}>
            <li><b>Pipelines by Tool</b> - View which Pipelines use a specific Tool. </li>
            <li><b>Tool Counts</b> - View Tool usage counts.</li>
          </ul>
          <h6>User Reports</h6>
          <ul style={{listStyleType: "none"}}>
            <li><b>Group Membership</b> - View the Group Membership of a selected User.</li>
            <li><b>Pipelines by Owner</b> - View pipelines owned by selected user.</li>
            <li><b>Tools by Owner</b> - View tools owned by a selected user.</li>
            <li><b>Tasks by Owner</b> - View tasks owned by selected user.</li>
            <li><b>User Report</b> - View report for selected user.</li>
            <li><b>Access Token Usage Report</b> - View Access Token usage.</li>
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