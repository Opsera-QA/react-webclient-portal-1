import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function JiraMTTRChartHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Jira Mean Time To Resolution"}
    >
      <div>This chart represents the mean time to resolution of Jira incidents. This chart always displays the 15 most recent results of the <b>Date Range</b> selected in KPI Settings. The <b>Mean Time to Resolution</b> chart on the left depicts the mean time to resolution of Jira incidents by date, showing only 15 results. The <b>Number of Incidents</b> chart on the right depicts the number of incidents by severity. Customize the results to display only specific <b>Jira Priorites</b> and <b>Jira Projects</b> in the KPI Settings.</div>
      <div className={"mt-2"}>
        <ul style={{listStyleType: "none"}}>
        <li><b>Total Incidents</b> - Total number of incidents that were created for the selected time range.</li>
          <li><b>Resolved Incidents</b> - Total number of incidents that were resolved for the selected time range.</li>
          <li><b>Average MTTR (Hours)</b> - The overall average time taken to resolve incidents without consideration to Severity/Priority.</li>
          <li><b>Min MTTR (Hours)</b> - The minimum time taken to resolve an incident within a selected time range.</li>
          <li><b>Max MTTR (Hours)</b> - The maximum time taken to resolve an incident within a selected time range.</li>
          <li><b>Aging of Unresolved Tickets</b> - Displays the number of tickets that have yet to be resolved by specific day ranges (<b>Last Five Days</b>, <b>5-15 Days</b>, <b>15-30 Days</b>, <b>&gt; 30 Days</b>).</li>
        </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

JiraMTTRChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(JiraMTTRChartHelpDocumentation);