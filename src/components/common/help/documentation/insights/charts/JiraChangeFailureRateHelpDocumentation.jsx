import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function JiraChangeFailureRateHelpDocumentation({closeHelpPanel}) {
    return (
      <HelpDocumentationContainer
        closeHelpPanel={closeHelpPanel}
        helpTopic={"Jira Change Failure Rate"}
      >
        <div>
          <div className={"mb-2"}>This chart displays the change failures percentage and failures chart based on selected timelines.</div>
            <div>
              <ul style={{listStyleType: "none"}}>
                <li><b>Jira Change Failure Chart</b> - Displays the change failures for the chosen period of time and filters.</li>
                <li><b>Jira Change Failure Rate Value</b> - Displays the percentage of the changes failed for the chosen period of time, along with a trend.
                  <ul>
                    <li><b>Change Failure Rate</b> = <i>(Total Change Failures/ Total Issues) * 100</i></li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>
    </HelpDocumentationContainer>
    );
}

JiraChangeFailureRateHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(JiraChangeFailureRateHelpDocumentation);