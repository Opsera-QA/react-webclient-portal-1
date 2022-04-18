import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function LogsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div>Opsera’s Logs are used to view logs at the tool or pipeline level using a free text search with Date Range filter. Use the <b>Tabbed View</b> to view an individual log or the <b>Side By Side</b> view to compare logs side by side. For more detailed information on Logs usage, view the <b><a href="https://opsera.atlassian.net/l/c/D6hcMay1" target="_blank" rel="noreferrer">Logs Help Documentation</a></b>. To access logs:</div>
        <div className={"ml-2 mt-2"}>
          <ol>
            <li>Select a tool or pipeline name from the <b>Search Index</b> dropdown and provide text in the <b>Search Input</b> field to search as shown.</li>
            <li>Select a <b>Date Range</b>.</li>
            <li>Click the <b>Search</b> button to view results.</li>
            <li>Once the results are displayed, click the magnifying glass icon to expand the associated logs in JSON format. </li>
            <li>To export the results to PDF, click the PDF icon, provide a <b>File Name</b>, select an Export Option and click <b>Export Data</b>.</li>
            </ol>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Logs"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(LogsHelpDocumentation);