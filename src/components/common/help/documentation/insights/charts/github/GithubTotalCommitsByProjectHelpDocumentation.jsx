import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubTotalCommitsByProjectHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Total Commits By Project"}
        >
            <div>
                <div className={"mb-2"}>
                    A leaderboard KPI to compare between Projects/Applications, to measure the activity based on commits in each repository through filters/tags/date ranges.
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubTotalCommitsByProjectHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubTotalCommitsByProjectHelpDocumentation);