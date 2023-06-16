import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function
    GitScrapperMetricsHelpDocumentation({ closeHelpPanel }) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Git Scrapper Metrics"}
        >
            <div>
                <div className={"mt-2"}><h5>Metrics</h5></div>
                <ul style={{ listStyleType: "none" }}>
                    <li><b>Scanned Repositories:</b> Displays the number of scanned repositories in the provided date range.</li>
                    <li><b>Clean Repositories:</b> Displays the number of clean repositories in the provided date range.</li>
                    <li><b>Total Number of Issues:</b> Displays the number of issues existing in the provided date range. Click the <i>Total number of issues</i> tab to view detailed information on the identified issues. For each issue, you can view insights using the magnifier icon on the top-right corner. </li>
                </ul>
                <div>Click the magnifier export icon on the top right corner of the table view. This lists the <b>Git Scraper Reports</b> displaying the information on path, author, Line Number and commit. You can click the export icon on the top-right corner to download the report. In the Export Data pop-up that appears, choose the required format and enter a name for the file to start downloading.</div>
                <div className={"mt-2"}><h5>Entropy</h5></div>
                <ul style={{ listStyleType: "none" }}>
                    <li>Plain Text passwords are identified using the entropy of the string identified. </li>
                    <li>For instance, a string composed of only one character <b><i>aaaaa</i></b> has very low entropy. A longer string with a larger set of characters <b><i>wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</i></b>, has higher entropy. </li>
                    <li>Another example, the string “password” has an entropy of 2.75 </li>
                    <li>For Git Custodian Pipeline step, the default entropy is set to 3.5.  However, entropy can be set to different values in the range of 2.4 to 5. </li>
                </ul>

            </div>
        </HelpDocumentationContainer>
    );
}

GitScrapperMetricsHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GitScrapperMetricsHelpDocumentation);