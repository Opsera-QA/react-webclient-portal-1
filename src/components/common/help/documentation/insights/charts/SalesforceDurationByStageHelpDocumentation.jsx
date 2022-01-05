import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SalesforceDurationByStageHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Salesforce Duration By Stage"}
    >
      <div>
        <div className={"mb-2"}>This KPI represents different stages of a Salesforce pipeline. It measures the average duration of each stage, along with the trend for the selected time period. Each stage has 1 data block which represents the average time taken to execute that stage in a pipeline, along with the total number of step executions. The chart associated with it shows the trend over the selected time period.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Package Creation</b> - Includes pipelines with a Salesforce Package Generation step.</li>
            <li><b>Package Validation</b> - Includes pipelines with a Salesforce Validate XML step.</li>
            <li><b>Profile Migration</b> - Includes pipelines with a Salesforce Profile Migration step.</li>
            <li><b>Backups</b> - Includes pipelines with a Salesforce Back Up step.</li>
            <li><b>Unit Testing</b> - Includes pipelines with a Salesforce Unit Testing step.</li>
            <li><b>Deployment</b> - Includes pipelines with a Salesforce Deploy step.</li>
          </ul>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

SalesforceDurationByStageHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SalesforceDurationByStageHelpDocumentation);