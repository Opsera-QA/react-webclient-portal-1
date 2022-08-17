import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GitlabDeployFrequencyChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"GitLab Lead Time"}
    >
      <div>
        <div className={"mb-2"}>This KPI measures GitLab average lead and merge time and lead time. You have the option to view data from a specific Deployment Stage and Gitlab Project(s) by configuring them in the KPI Settings.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Average Lead Time </b> -  The average time (in days) it takes from code commit to production deployment. The <b>Deployment Stage</b> can be defined in the KPI Settings.  </li>
            <li><b>Average Merge Time</b> - The average time (in days) it takes from a code commit to complete a merge request. </li>
            <li><b>Lead Time</b> - This bar chart displays the lead time by number of days and the number of commits that have been made, merged and deployed to production. </li>
          </ul>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

GitlabDeployFrequencyChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GitlabDeployFrequencyChartHelpDocumentation);