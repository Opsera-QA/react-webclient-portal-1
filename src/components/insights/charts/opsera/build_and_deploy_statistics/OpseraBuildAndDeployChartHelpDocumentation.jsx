import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function OpseraBuildAndDeployChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Opsera Build and Deployment Statistics"}
    >
      <div>This chart consists of Build and Deployment statistics of Opsera Pipelines.</div>
    </HelpDocumentationContainer>
  );
}

OpseraBuildAndDeployChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(OpseraBuildAndDeployChartHelpDocumentation);