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
        <div className={"mb-2"}>This chart reflects the percentage of regression tests that are automated vs manually executed.</div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Automated Test Cases Executed</b> - Total number of automated test cases executed.</li>
            <li><b>Automated Test Cases Executed Manually</b> - Total number of automated test cases executed manually.</li>
            <li><b>Adoption Percentage</b> - The percentage of tests that are automated vs manually executed . Ideally this number should be 100, meaning all of them are automated and none of them are done manually.
              <ul>
                <li><b>Adoption Percentage</b> = % (Automatically Executed Automation Tests)/ (Automatically Executed Automation Tests + Manually Executed Automation Tests).</li>
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