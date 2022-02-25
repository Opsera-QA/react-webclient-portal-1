import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function AutomationPercentageChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Automation Percentage"}
    >
      <div>
        <div className={"mb-2"}>This chart reflects the percentage of regression tests that are automated vs. manually executed.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Total Number of Automation Candidates</b> - Total number of test cases to be automated. </li>
            <li><b>Total Number of Regression Test Cases</b> - Total number of  test cases run during regression.</li>
            <li><b>Regression Test Cases to be Automated</b> - Regression test cases yet to be automated.</li>
            <li><b>Total Number of Functional Test Cases</b> - Total number of test cases not executed as part of regression.</li>
            <li><b>Regression Test Cases Automated</b> - Total number of test cases automated.</li>
            <li><b>Automation Percentage</b> - The percentage of regression tests that are automated vs manually executed . Ideally this number should be 100, meaning all of them are automated and none of them are done manually.
              <ul>
                <li><b>Automation Percentage</b> = % (Regression Test Cases Automated)/ (Total Number of Automation Candidates).</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

AutomationPercentageChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(AutomationPercentageChartHelpDocumentation);