import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function DoraJiraGitlabHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Dora Jira Gitlab"}>
      <div>The Dora Jira Gitlab KPI calculates the maturity levels for each DORA metric in a unified way. For more information view the <a href="https://docs.opsera.io/insights/kpi/dora-metrics/dora-jira-gitlab-rolled-up-kpi" target="_blank" rel="noreferrer"><b>Dora Jira Gitlab Rolled Up KPI Help Documentation</b>.</a>
          <ul style={{listStyleType: "none"}}>
            <li><b>Deployment Stage</b> - Choose a deployment stage (Example: Prod).</li>
            <li><b>Gitlab Project</b> - Choose one or multiple Gitlab projects from the drop-down.</li>
            <li><b>Jira Project for MTTR/ID</b> - Choose the Jira project to be considered for the Mean Time to Resolution calculation.</li>
            <li><b>Jira Project for CFR</b> - Choose the Jira project to be considered for the Change Failure Rate calculation.</li>
            <li><b>Jira Resolution Names</b> - Select Jira resolution names to be included with results.</li>
            <li><b>Exclude JIRA Resolution Names</b> - Choose the names that will be excluded.</li>
            <li><b>Exclude JIRA Change Types</b> - Choose the change types that will be excluded.</li>
          </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

DoraJiraGitlabHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(DoraJiraGitlabHelpDocumentation);
