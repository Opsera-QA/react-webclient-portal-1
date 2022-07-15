import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubSecurityComplianceHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Security Compliance"}
        >
            <div>
                <div>
                    <ul>
                        <li>The security compliance KPI is available to get an understanding on how many pipelines/workflows have a security step configured and how many do not.</li>
                        <li>The base KPI has a pie chart that shows 2 variations, % of workflows with security steps configured, and % of workflows without a security step.</li>
                        <li>There is a trend over time line chart that shows how many workflows executions have passed/failed/skipped the security step during execution.</li>
                    </ul>
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubSecurityComplianceHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubSecurityComplianceHelpDocumentation);