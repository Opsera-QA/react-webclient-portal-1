import React from "react";
import PropTypes from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SfdcWizardXmlViewerHelpDocumentation({closeHelpPanel, componentType}) {
  return (
    <HelpDocumentationContainer
      helpTopic={`SalesForce ${componentType} Run: XML Viewer`}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/salesforce/salesforce-wizard-run`}
    >
      <div>Review the XML package and Unit Test classes and select <b>Proceed</b> to trigger the {componentType.toLowerCase()} run.</div>
    </HelpDocumentationContainer>
  );
}

SfdcWizardXmlViewerHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
  componentType: PropTypes.string,
};

export default React.memo(SfdcWizardXmlViewerHelpDocumentation);