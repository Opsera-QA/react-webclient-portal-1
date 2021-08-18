import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types"; 

function SonarRatingsChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Pipelines Overview"}
    >
      <div>Some pipeline executions may have been stopped due to manual interventions, and those pipeline executions count will not reflect in the Failed Pipeline Executions.</div>
      
    </HelpDocumentationContainer>
  );
}

SonarRatingsChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SonarRatingsChartHelpDocumentation);