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