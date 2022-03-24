import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SonarRatingsLeadershipChartHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Sonar Ratings Leadership"}
    >
      <div className={"mb-2"}>This chart focuses on various leadership metrics, such as Code Coverage and Maintainability. The trend icons are based on previous scan.</div>
      <div className={"ml-3 mt-2"}>
        <h6>Sonar Ratings: Maintainability</h6>
        <div className={"ml-3"}>
          <div><b>Maintainability</b> - Rating given to your project related to the value of your Technical Debt Ratio.</div>
          <div><b>Maintainability Rating</b>: <b>A</b> = 0-0.5, <b>B</b> = 0.6-0.1, <b>C</b> = 0.11-0.20, <b>D</b> = 0.21-0.5, <b>E</b> = 0.51-1</div>
          <div><b>Technical Debt Ratio</b> - Cumulative percentage of ration between remediation cost and development cost, from most recent scans, of associated pipelines from applied tags, and chosen time filter.</div>
        </div>
        <h6 className={"mt-2"}>Sonar Ratings: Code Coverage</h6>
        <div className={"ml-3"}>
          <div><b>Line Coverage</b> - On a given line of code, line coverage depicts if the line of code was executed during the execution of unit tests. It is the density of covered lines by unit tests. </div>
          <div><b>Line Coverage</b>: (Covered Lines/Total Number of Executable Lines)</div>
          <div><b>Unit Tests</b> - Number of unit tests executed.</div>
          <div><b>Duplicated Lines</b> - Number of lines involved in duplications.</div>
          <div><b>Duplicated Line Density%</b>: (Duplicated Lines/Lines) * 100.</div>
        </div>
        <h6 className={"mt-2"}>Code Coverage Metrics Report</h6>
        <div className={"ml-3"}>
          <div><b>Code Coverage%</b>: (Lines to Cover - Uncovered Lines)/Lines To Cover. </div>
          <div><b>Lines to Cover</b> - Number of lines of code which could be covered by unit tests (Not including blank lines or comment lines).</div>
          <div><b>Uncovered Lines</b> - Number of lines of code which are not covered by unit tests.</div>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

SonarRatingsLeadershipChartHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(SonarRatingsLeadershipChartHelpDocumentation);