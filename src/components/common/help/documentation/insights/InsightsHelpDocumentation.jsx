import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "../../../overlays/center/help/HelpOverlayBase";
import PropTypes from "prop-types";
import AssignedRoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";
import SiteRoleAccessTable from "components/common/fields/access/table/SiteRoleAccessTable";

function InsightsHelpDocumentation({dashboardRoleDefinitions}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div className={"ml-2"}>
        <div className={"mb-2"}>Dashboards serve as your organization&rsquo;s repository of customized logging and analytics. You can either create a custom dashboard or create one from an existing template. Dashboards contain charts measuring pipeline, planning, security, quality and operations data, all which can be used to formulate your organization&rsquo;s KPIs (key performance indicators). Apply tags to individual charts or at the dashboard level to apply them to every chart within a dashboard.
        </div>
        <div className={"ml-4"}><b>Dashboard Templates</b> - Create a dashboard from an existing template. Navigate to <b>Marketplace</b> and select the <b>Dashboards</b> tab. Choose from the following templates:</div>
          <ul style={{listStyleType: "none"}}>
              <li><b>Public Marketplace</b> -  A catalog of predefined dashboards focused on topics and personas.</li>
              <li><b>Private Catalog</b> - A catalog of dashboards accessible to your organization only. </li>
          </ul>
          <div className={"ml-4"}><b>Custom Dashboard</b> - Create a customized dashboard by clicking the <b>+ New Dashboard</b> button and providing values for the following fields:</div>
            <ul style={{listStyleType: "none"}}>
              <li><b>Name</b> - Create a custom name for your dashboard.</li>
              <li><b>Type</b> - Select type based on the data the charts in your dashboard will measure. Choose from pipeline, planning, security, quality or operations.</li>
              <li><b>Persona</b> - Select developer, manager or executive.</li>
              <li><b>Visibility</b> - Select private if you wish for the dashboard to only be available to you or <b>My Organization</b> if you wish to make the template accessible to users within your organization.</li>
              <li><b>Description</b> - Provide a description for your dashboard.</li>
              <li><b>Tags</b> - Tags selected will be applied to all charts in the dashboard. You can edit, remove, or add KPI-specific tags in Dashboard Viewer once the dashboard has been created.</li>
            </ul>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Insights: My Dashboard"}
      helpDocumentation={getHelpDocumentation()}
    >
      <div className={"my-2"}>
        <AssignedRoleAccessTable
          roleAccessDefinitions={dashboardRoleDefinitions}
        />
      </div>
      <div className={"my-2"}>
        <SiteRoleAccessTable
          roleAccessDefinitions={dashboardRoleDefinitions}
        />
      </div>
    </HelpOverlayBase>
  );
}

InsightsHelpDocumentation.propTypes = {
  dashboardRoleDefinitions: PropTypes.object,
};

export default React.memo(InsightsHelpDocumentation);