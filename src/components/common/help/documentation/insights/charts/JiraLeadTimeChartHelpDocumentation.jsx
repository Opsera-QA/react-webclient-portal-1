import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function JiraLeadTimeChartHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Jira Lead Time"}
    >
      <div>This chart represents the cluster of Jira issues completed that day with their lead times.</div>
      <div className="ml-4">
        <div className="mt-2"><b>Mean Lead Time (Days)</b> - Average time (in days) taken for a Jira ticket to transition from creation to completion status.</div>
        <div><b>Issues Completed</b> - Total number of issues completed in specified time period.</div>
        <div><b>Bugs Completed</b> - Total number of bugs completed in this time period.</div>
      </div>
      <ul className="mt-2">
        <li><span>The orange line represents the average lead time</span></li>
        <li><span>The dark orange line represents the rolling average lead time</span></li>
        <li><span>Each point represents the cluster of issues completed on that specific date in that many days</span></li>
        <li><span>Click on a specific point to see which Jira issues with that lead time were completed that day</span></li>
        <li><span>The default issue displayed is Story. If you are interested in the lead time for a specific Jira issue type (Epic, Bug, etc.), configure in the KPI Settings Form</span></li>
        <li><span>The default completion status is Done. Configure which statuses indicate ticket completion in the KPI Settings Form</span></li>
      </ul>
    </HelpDocumentationContainer>
  );
}

JiraLeadTimeChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(JiraLeadTimeChartHelpDocumentation);