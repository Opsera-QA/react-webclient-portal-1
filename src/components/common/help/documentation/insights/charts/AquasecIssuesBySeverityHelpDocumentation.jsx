import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function AquasecIssuesBySeverityHelpDocumentation({ closeHelpPanel }) {
    return (
        <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Aquasec Issues By Severity"}>
            <div>
                The purpose of this KPI is to show Issues by severity. Each data block defines the total number of issues in all
                projects by severity. Each datablock will also display the trend of each severity, based on the previous
                scan result of each project. The KPI also displays the top 3 projects that have the overall highest number of
                issues. For more information view the <a href="https://docs.opsera.io/insights/kpi/aquasec-security-insights" target="_blank" rel="noreferrer"><b>Aquasec Security Insights Help Documentation</b>.</a>
            </div>
        </HelpDocumentationContainer>
    );
}

AquasecIssuesBySeverityHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(AquasecIssuesBySeverityHelpDocumentation);
