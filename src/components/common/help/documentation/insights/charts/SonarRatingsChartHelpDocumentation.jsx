import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function SonarRatingsChartHelpDocumentation() {
  return (
    <HelpDocumentationContainer
      helpTopic={"Sonar Ratings"}
    >
      <div>This KPI consists of various security metrics, such as bugs, vulnerabilities and code smells.</div>
      <div><b>Bugs</b> - Cumulative number of bugs from most recent scans, of associated pipelines from applied tags,
        and chosen time filter.
      </div>
      <div><b>Vulnerabilities</b> - Cumulative number of vulnerabilities from most recent scans, of associated pipelines
        from applied tags, and chosen time filter.
      </div>
      <div><b>Technical Debt Ratio</b> - Cumulative percentage of ration between remediation cost and development cost,
        from most recent scans, of associated pipelines from applied tags, and chosen time filter.
      </div>
      <div><h5>Rating Info</h5>
        <div><b>Maintainability</b></div>
        <div><b>A</b>: 0-0.05</div>
        <div><b>B</b>: 0.06-0.1</div>
        <div><b>C</b>: 0.11-0.2</div>
        <div><b>D</b>: 0.21-0.5</div>
        <div><b>E</b>: 0.51-1</div>
      </div>
      <div><b>Reliability</b>
        <div><b>A</b>: 0 Bugs</div>
        <div><b>B</b>: At least 1 Minor Bug</div>
        <div><b>C</b>: At least 1 Major Bug</div>
        <div><b>D</b>: At least 1 Critical Bug</div>
        <div><b>E</b>: At least 1 Blocker Bug</div>
      </div>
      <div><b>Security</b>
        <div><b>A</b>: 0 Vulnerabilities</div>
        <div><b>B</b>: At least 1 Minor Vulnerability</div>
        <div><b>C</b>: At least 1 Major Vulnerability</div>
        <div><b>D</b>: At least 1 Critical Vulnerability</div>
        <div><b>E</b>: At least 1 Blocker Vulnerability</div>
      </div>
    </HelpDocumentationContainer>
  );
}

export default React.memo(SonarRatingsChartHelpDocumentation);