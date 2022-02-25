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
            <li><b>Build</b> - Includes pipelines with a build<b>*</b> step using Jenkins tool.</li>
            <li><b>Quality Scan</b> - Includes pipelines with quality step including Coverity or Sonar tool.</li>
            <li><b>Test</b> - Includes pipelines with test steps using JUnit, NUnit, JMeter or Selenium tool.</li>
            <li><b>Deploy</b> - Includes pipelines with a deployment<b>*</b> step using Argo, Octopus, Azure AKS Deploy, Azure Functions, AWS Lambda, AWS ECS Deploy, or SSH Deploy tool.</li>
            <li><b>Security Scan</b> - Includes pipelines with a security step using Anchore, Twistlock, Sonar, Coverity or Terrascan tool.</li>
            <li><b>Command Line</b> - Includes pipelines with shell script steps using PowerShell, Command Line, NPM, or .NET tool.</li>
          </ul>
          <div className={"ml-2"}><b>*</b>Salesforce builds and deployments are not accounted for.</div>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

SdlcDurationStatisticsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SdlcDurationStatisticsHelpDocumentation);