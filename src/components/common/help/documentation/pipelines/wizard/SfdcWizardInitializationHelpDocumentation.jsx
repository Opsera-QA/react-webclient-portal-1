import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SfdcWizardInitializationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"SalesForce Pipeline Run: Initialization"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/salesforce/salesforce-wizard-run`}
    >
      <b>Manual Pipeline Wizard Run</b>
      <ul>
        <li>To continue with any parameters selected within the past 24 hours, select <b>Continue Where The Last Instance Left Off</b>.</li>
        <li>To start a new instance without any previously selected parameters, select <b>Start A New Instance</b></li>
      </ul>
      <b>XML/File Upload Process</b> - For a more in depth outline of this process including a CSV template, view the <b><a href="https://docs.opsera.io/salesforce/salesforce-wizard-run#csv-upload" target="blank">CSV Upload Wizard documentation</a></b>.
      <ul>
        <li>Confirm that the prepared CSV file matches these upload requirements:</li>
        <ol>
          <li>Component Qualified API Name should be given under the Component Name column in a CSV Upload file</li>
          <li>Added, Removed, and Modified Action Types are permitted (If empty we consider it as Modified)</li>
          <li>Wildcard entries (*) are not supported in Package XML</li>
          <li>The maximum number of components supported is 10,000</li>
          <li>Upload file can be of .csv/.xml extension only (single file is allowed) </li>
          <li>The maximum file size supported is 500 KB</li>
        </ol>
        <li>Drop the CSV file directly into the upload box or click on the upload box to make a file selection.</li>
        <li>Select the Source Org: <b>From Salesforce</b> or <b>From Git</b>.</li>
        <li>Select <b>Process File</b> and a table with data will be generated. Confirm that the information is accurate then select <b>Proceed with Selected File</b>.</li>
      </ul>
    </HelpDocumentationContainer>
  );
}

SfdcWizardInitializationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardInitializationHelpDocumentation);