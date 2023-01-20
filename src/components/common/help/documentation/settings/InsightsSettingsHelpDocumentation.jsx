import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

export default function InsightsSettingsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Administrators and Power Users can manage analytics settings from this dashboard.
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            <li><b>Analytics Data Entry</b> - Manage analytics data manually and see it reflected in corresponding dashboard KPIs for specific charts. </li>
            <li><b>Analytics Profile</b> - Manage Opsera Analytics Engine Settings.</li>
            <li><b>Analytics Data Mappings</b> - Apply and connect tags to incoming external data with Opsera.</li>
            <li><b>Analytics Data Mapping: Organizations</b> - Manage organizations.</li>
            <li><b>Tags</b> - Manage tags and view tag usage in Tools, Pipeline and Dashboards.</li>
          </ul>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Analytics Settings"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

