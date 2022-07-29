import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GitlabDeployFrequencyChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Gitlab Deployment Frequency Help"}
    >
      <div>
        <div className={"mb-2"}>This chart displays an overall summary of Deploy stages in pipelines. Measure the success percentage based on the number of successful deployments and the total number of pipeline executions involving the deployment stages. <b>Deployment Statistics</b> provide actionable insights, which allow users to click and view a report including a breakdown of individual pipeline executions. To customize goals based on your organization&#39;s goal, provide values in Settings.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Deployment Statistics</b> - Success Rate indicates the success percentage for scores for the chosen period of time.</li>
            <li><b>Deployment Frequency Statistics</b> - Displays the average number of deployments that occur daily for the chosen period of time, along with a trend.
              <ul>
                <li><b>Success Rate</b> = (Successful Deploy Executions/Total Deploy Executions)*100</li>
              </ul>
            </li>
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