import React from "react";
import PropTypes from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SfdcWizardUnitTestSelectionViewHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"Salesforce Pipeline Run: Unit Test Selection View"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/archive/opsera-pipelines/salesforce-pipeline-user-guides/salesforce-based-pipelines/salesforce-pipeline-wizard-help`}
    >
      <div>During the unit testing process, the testing classes must be specified per step. Please select each step
        below and then apply the required testing classes before proceeding. Please note, without this step, the
        pipeline cannot complete successfully.
      </div>
      <div>Enable the toggle to Manually Enter Test Classes. Write the values in the given field separated by a comma
        and select Save Test Classes to apply.
      </div>
      <div>Adding Unit Test Classes</div>
      <ul>
        <li>To add unit test classes from the selected unit test step, select them in the left column and select <b>Add
          Selected</b>.
        </li>
        <li>To add all unit test classes, select <b>+Add All</b>.</li>
        <li>To add all unit test classes currently viewed in the pagination, select <b>+Add All Shown</b>.</li>
      </ul>
      <div>Removing Unit Test Classes</div>
      <ul>
        <li>To remove unit test classes from the selected unit test step, select them in the right column and select <b>Remove
          Selected</b>.
        </li>
        <li>To remove all unit test classes, select <b>Remove All</b>.</li>
        <li>To remove all unit test classes currently viewed in the pagination, select <b>Remove All Shown</b>.</li>
      </ul>
    </HelpDocumentationContainer>
  );
}

SfdcWizardUnitTestSelectionViewHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardUnitTestSelectionViewHelpDocumentation);