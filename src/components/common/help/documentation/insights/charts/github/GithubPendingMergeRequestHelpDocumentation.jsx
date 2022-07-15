import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubPendingMergeRequestHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Pending Merge Requests"}
        >
            <div>
                <div className={"mb-2"}>
                    List of Pending Merge requests by application, to be able to see list of PRs that are yet to be processed. The list provides details on timestamp the PR was created at, branch to which the PR has been raised, title, author and reviewer if it&apos;s assigned to someone.
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubPendingMergeRequestHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubPendingMergeRequestHelpDocumentation);