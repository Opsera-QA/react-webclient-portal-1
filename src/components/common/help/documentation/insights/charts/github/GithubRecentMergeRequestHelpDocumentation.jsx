import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubRecentMergeRequestHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Recent Merge Requests"}
        >
            <div>
                <div className={"mb-2"}>This KPI provides the list of PRs that have been merged recently.
                    <br></br>
                    Select by Repository name, the list appears with details on each PR that has been processed.
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubRecentMergeRequestHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubRecentMergeRequestHelpDocumentation);