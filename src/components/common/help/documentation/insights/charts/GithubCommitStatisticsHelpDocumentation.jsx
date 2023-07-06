import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubCommitStatisticsHelpDocumentation({ closeHelpPanel }) {
    return (
        <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Github Commits"}>
            <div>This chart calculates the various parameters of Github Pull Requests including:
                <ul style={{listStyleType: "none"}}>
                    <li><b>Total Activity</b> - Total sum of all the Github pull request activity including pull requests that have been closed, opened, assigned, reopened, edited and more.</li>
                    <li><b>Total Pull Requests</b> - Total sum of pull requests that are open, merged or declined</li>
                    <li><b>Total Open Pull Requests</b> - Total Pull Requests that are open and not merged in.</li>
                    <li><b>Merged Pulled Requests</b> - Total number of approved Pull Requests that are merged in.</li>
                    <li><b>Total Commits</b> - Total Github commits pushed  </li>
                    <li><b>Declined Pull Requests</b> - Total Github Pull Requests that are closed and are not merged in</li>
                    <li><b>Total Fixed Pull Requests</b> - Total Pull Requests that were first declined, reopened, fixed and then raised as a pull request again.</li>
                </ul>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubCommitStatisticsHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubCommitStatisticsHelpDocumentation);