import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SdlcDurationStatisticsHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"SDLC Duration Statistics"}
    >
      <div>
        <div className={"mb-2"}>This KPI represents different stages of an SDLC pipeline. It measures the average duration of each stage, along with the trend for the selected time period. Each stage has 1 data block which represents the average time taken to execute that stage in a pipeline, along with the total number of step executions. The chart associated with it shows the trend over the selected time period. </div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Build</b> - Includes pipelines with a build stage<b>*</b>.</li>
            <li><b>Deployments</b> - Includes pipelines with a deployment step<b>*</b>.</li>
            <li><b>Security Scan</b> - Includes pipelines with Anchore or Twistlock steps.</li>
            <li><b>Quality Scan</b> - Includes pipelines with Coverity or Sonar steps.</li>
            <li><b>Testing</b> - Includes pipelines with test steps involved (Selenium, Jmeter, etc).</li>
            <li><b>Scripts</b> - Includes pipelines with shell script steps.</li>
          </ul>
          <div className={"ml-2"}><b>*</b>Salesforce builds are not accounted for.</div>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

SdlcDurationStatisticsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SdlcDurationStatisticsHelpDocumentation);