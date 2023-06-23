import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function
    GitScrapperMetricsHelpDocumentation({ closeHelpPanel }) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
           // helpTopic={"Git Scrapper Metrics"}
        >
            <div>
                <div className={"mt-2"}><h5>Metrics</h5></div>
                <ul style={{ listStyleType: "none" }}>
                    <li><b>Scanned Repositories:</b> Displays the number of scanned repositories in the provided date range.</li>
                    <li><b>Clean Repositories:</b> Displays the number of clean repositories in the provided date range.</li>
                    <li><b>Total Number of Issues:</b> Displays the number of issues existing in the provided date range. Click the <i>Total number of issues</i> tab to view detailed information on the identified issues. For each issue, you can view insights using the magnifier icon on the top-right corner. </li>
                </ul>
                <div className={"mt-2"}><h5>Entropy</h5></div>
                <div>Entropy of a plain text password is based on the quality of he password. A higher entropy denotes a stronger password</div>
                <div className={"mt-2"}></div>
                <div>Should you need understanding on viewing/exporting Git Custodian Reports, read the <b>help documentation</b></div>

            </div>
        </HelpDocumentationContainer>
    );
}

GitScrapperMetricsHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GitScrapperMetricsHelpDocumentation);