import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubMostActiveContributorsHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Most Active Contributors"}
        >
            <div>
                <div>
                    <ul>
                        <li>The list of most active contributors is measured by the total number of commits made by each developer.</li>
                        <li> This KPI can be used as a leader board metric to identify the actively contributing developer in a team.</li>
                    </ul>
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubMostActiveContributorsHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubMostActiveContributorsHelpDocumentation);