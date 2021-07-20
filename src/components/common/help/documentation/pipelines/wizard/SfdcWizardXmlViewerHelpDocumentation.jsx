import React from "react";
import PropTypes from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SfdcWizardXmlViewerHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"SalesForce Pipeline Run: XML Viewer"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://opsera.atlassian.net/l/c/XbSETC14`}
    >
      <div>Review the XML package and Unit Test classes and select <b>Proceed</b> to trigger the pipeline run.</div>
    </HelpDocumentationContainer>
  );
}

SfdcWizardXmlViewerHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardXmlViewerHelpDocumentation);