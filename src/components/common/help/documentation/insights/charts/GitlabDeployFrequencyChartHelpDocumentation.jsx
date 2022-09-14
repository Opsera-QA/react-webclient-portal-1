import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GitlabDeployFrequencyChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"GitLab Deployment Frequency"}
    >
      <div>
        <div className={"mb-2"}>This chart displays an overall summary of deployment in pipelines. To customize goals based on your organization&#39;s goal, provide values in Settings.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Deployment Frequency Chart</b> - Displays the average number of deployments that occur daily for the chosen period of time.</li>
            <li><b>Deployment Frequency Value</b> - Displays the overall average number of deployments for the chosen period of time, along with a trend.
              <ul>
                <li><b>Deployment Frequency</b> = <i>(Successful deployments for selected time interval/ Total number of days selected)</i></li>
                <li><b>Previous Frequency</b> = <i>(Successful deployments for <b>Previous Time Interval*</b>/ Total number of days selected)</i></li>
                <ul style={{listStyleType: "none"}}>
                  <li><b>* Previous Time Interval</b> - The time interval before the selected time.
                    <ul style={{listStyleType: "none"}}>
                      <li><b>Example 1</b>: Current week, <b>Previous</b> - Previous week</li>
                      <li><b>Example 2</b>: Current Quarter, <b>Previous</b> - Previous Quarter</li>
                      <li><b>Example 3</b>: For x days from y.(y to y + x), <b>Previous</b> - For x days from y-x.(y-x to y)</li>
                    </ul>
                  </li>
                </ul>
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