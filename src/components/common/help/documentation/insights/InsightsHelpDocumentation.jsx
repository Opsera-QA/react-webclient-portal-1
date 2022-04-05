import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "../../../overlays/center/help/HelpOverlayBase";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function InsightsHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Manage your dashboards, which serve as your organization&rsquo;s repository of customized logging and analytics. Dashboards contain charts measuring pipeline, planning, security, quality and operations data, all which can be used to formulate your organization&rsquo;s KPIs (key performance indicators).
        </div>
        <div className={"mt-2 ml-4"}><h6><b>Manage an existing dashboard:</b></h6>
        <div className={"ml-4"}>Select a dashboard from the table to navigate to the Dashboard Viewer. Apply KPI tags to an individual chart within the dashboard by accessing the settings or apply dashboard tags to apply them to every chart within the selected dashboard.</div></div>
        <div className={"mt-2 ml-4"}><h6><b>Create a new dashboard from a template:</b></h6>
          <div className={"ml-4"}>To create a dashboard from an existing template, navigate to Marketplace and select the Dashboards tab. Choose from the following templates:
            <div className={"ml-4"}>
              <div><b>Public Marketplace</b> offers a catalog of predefined dashboards focused on topics and personas.</div>
              <div><b>Private Catalog</b> contains dashboards accessible to your organization only. </div>
            </div>
          </div>
        </div>
        <div className={"mt-2 ml-4"}><h6><b>Create a new customized dashboard:</b></h6>
          <div className={"ml-4"}>Create a customized dashboard by selecting <b>+ New Dashboard</b> button and providing values for the following fields:
            <div className={"ml-4"}>
              <div><b>Name</b> - Create a custom name for your dashboard.</div>
              <div><b>Type</b> - Select type based on the data the charts in your dashboard will measure. Choose from pipeline, planning, security, quality or operations.</div>
              <div><b>Persona</b> - Select developer, manager or executive.</div>
              <div><b>Visibility</b> - Select private if you wish for the dashboard to only be available to you or &lsquo;My Organization&lsquo; if you wish to make the pipeline accessible to users within your organization.</div>
              <div><b>Description</b> - Write a description for your dashboard.</div>
              <div><b>Tags</b> - Tags selected will be applied to all charts in the dashboard. You can edit, remove, or add KPI-specific tags in Dashboard Viewer once the dashboard has been created.</div>
            </div>
          </div>
          <div className={"ml-4"}>Select the <b>Create</b> button and the dashboard will now be accessible in My Dashboards.</div>
        </div>
      </div>
    );
  };

  return (
    <HelpDocumentationContainer
      helpTopic={"Insights: My Dashboard"}
    >
      {getHelpDocumentation()}
    </HelpDocumentationContainer>
    // <HelpOverlayBase
    //   closePanel={closePanel}
    //   showPanel={true}
    //   helpTopic={"Insights: My Dashboard"}
    //   helpDocumentation={getHelpDocumentation()}
    // >
    // </HelpOverlayBase>
  );
}

export default React.memo(InsightsHelpDocumentation);