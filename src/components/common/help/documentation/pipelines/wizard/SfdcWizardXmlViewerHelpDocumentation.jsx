import React from "react";
import PropTypes from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SfdcWizardXmlViewerHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Salesforce Pipeline Run: XML Viewer"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/archive/opsera-pipelines/salesforce-pipeline-user-guides/salesforce-based-pipelines/salesforce-pipeline-wizard-help`}
    >
      <div>Review the XML package and Unit Test classes and select <b>Proceed</b> to trigger the pipeline run.</div>
    </HelpDocumentationContainer>
  );
}

SfdcWizardXmlViewerHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardXmlViewerHelpDocumentation);