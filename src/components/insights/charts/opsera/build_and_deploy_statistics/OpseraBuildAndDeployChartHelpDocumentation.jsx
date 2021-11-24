import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function OpseraBuildAndDeployChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Opsera Build and Deployment Statistics"}
    >
      <p>Showing an overall summary of Build and Deploy stages in pipelines. This KPI helps measure the success percentage based on the number of successful builds/deployments and the total number of pipeline executions involving the build/deployment stages. The trend indicates the success percentage scores for a chosen period of time.</p>
      <p>Also, this KPI calculates the average number of builds/deployments that occur daily for a chosen period of time, along with a trend.</p>
      <p>Success percentage also provides actionable insights, which allows users to drill down further into individual key metrics and pipeline executions in detail.</p>
    </HelpDocumentationContainer>
  );
}

OpseraBuildAndDeployChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(OpseraBuildAndDeployChartHelpDocumentation);