import React from "react";
import PropTypes from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SfdcWizardXmlViewerHelpDocumentation({closeHelpPanel, pipelineWizardModel}) {
  const getPipelineOrTaskText = (lowercase) => pipelineWizardModel.getData('fromGitTasks') ? lowercase ? 'task' : 'Task' : lowercase ? 'pipeline' :'Pipeline';

  return (
    <HelpDocumentationContainer
      helpTopic={`SalesForce ${getPipelineOrTaskText()} Run: XML Viewer`}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/salesforce/salesforce-wizard-run`}
    >
      <div>Review the XML package and Unit Test classes and select <b>Proceed</b> to trigger the {getPipelineOrTaskText(true)} run.</div>
    </HelpDocumentationContainer>
  );
}

SfdcWizardXmlViewerHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
};

export default React.memo(SfdcWizardXmlViewerHelpDocumentation);