import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function BuildAndDeployChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Build and Deployment Statistics"}
    >
      <div>
        <div className={"mb-2"}>This chart displays an overall summary of Build and Deploy stages in pipelines. Measure the success percentage based on the number of successful builds/deployments and the total number of pipeline executions involving the build/deployment stages. <b>Build Statistics</b> and <b>Deployment Statistics</b> provide actionable insights, which allow users to click and view a report including a breakdown of individual pipeline executions. To customize goals based on your organization&#39;s goal, provide values in Settings.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Build Statistics</b> - Success Rate indicates the success percentage for scores for the chosen period of time.
              <ul>
                <li><b>Success Rate</b> = (Successful Build Executions/Total Build Executions)*100</li>
              </ul></li>
            <li><b>Build Frequency Statistics</b> - Displays the average number of builds that occur daily for the chosen period of time, along with a trend.</li>
            <li><b>Deployment Statistics</b> - Success Rate indicates the success percentage for scores for the chosen period of time.
              <ul>
                <li><b>Success Rate</b> = (Successful Deploy Executions/Total Deploy Executions)*100</li>
              </ul></li>
            <li><b>Deployment Frequency Statistics</b> - Displays the average number of deployments that occur daily for the chosen period of time, along with a trend.</li>
          </ul>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

BuildAndDeployChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(BuildAndDeployChartHelpDocumentation);