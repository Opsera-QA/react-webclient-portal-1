import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GitlabDeployFrequencyChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Deployment Statistics"}
    >
      <div>
        <div className={"mb-2"}>This chart displays an overall summary of deployment in pipelines. To customize goals based on your organization&#39;s goal, provide values in Settings.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Frequency Chart</b> - Displays the average number of deployments that occur daily for the chosen period of time</li>
            <li><b>Frequency Value</b> - Displays the overall average number of deployments for the chosen period of time, along with a trend.
              <ul>
                <li><b>Deployment Frequency</b> = (Successful Deploy Executions(for selected time interval)/ Total number of days selected)</li>
                <li><b>Previous Frequency</b> = (Successful Deploy Executions(for previous time interval) /Total number of days selected)</li>
                <ul>
                  <li><b>Previous time Interval</b> - The time interval before the selected time.<br></br>
                    <b>Examples</b> :-<br></br>
                    <b>Selected</b> - Current week, <b>Previous</b> - Previous week<br></br>
                    <b>Selected</b> - Current Quarter, <b>Previous</b> - Previous Quarter<br></br>
                    <b>Selected</b> - For x days from y.(y to y + x), <b>Previous</b> - For x days from y-x.(y-x to y)
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