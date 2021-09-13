import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types"; 

function InsightsPipelinesOverviewHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Pipelines Overview"}
    >
      <div>Some Pipeline executions may have been stopped due to manual interventions, and those Pipeline executions will not be reflected in the Failed Pipeline Executions count.</div>
    </HelpDocumentationContainer>
  );
}

InsightsPipelinesOverviewHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(InsightsPipelinesOverviewHelpDocumentation);
