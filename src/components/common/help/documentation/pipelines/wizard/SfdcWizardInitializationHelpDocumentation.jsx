import React, { useContext } from "react";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";


function SfdcWizardInitializationHelpDocumentation() {
  return (
    <div className={"mt-3"}>
      <h5>SalesForce Pipeline Run: Initialization Help</h5>
      <b>Manual Pipeline Wizard Run</b>
      <ul>
        <li>To continue with any parameters selected within the past 24 hours, select <b>Continue Where The Last Instance Left Off</b>.</li>
        <li>To start a new instance without any previously selected parameters, select <b>Start A New Instance</b></li>
      </ul>
      <b>XML/File Upload Process</b> - For a more in depth outline of this process including a CSV template, view the <a href="https://opsera.atlassian.net/l/c/xX5DTbEF" target="blank">CSV Upload Wizard documentation</a>.
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
        <li>Select the Source Org: <b>From SFDC</b> or <b>From GIT</b>.</li>
        <li>Select <b>Process File</b> and a table with data will be generated. Confirm that the information is accurate then select <b>Proceed with Selected File</b>.</li>
      </ul>
    </div>
  );
}

export default React.memo(SfdcWizardInitializationHelpDocumentation);