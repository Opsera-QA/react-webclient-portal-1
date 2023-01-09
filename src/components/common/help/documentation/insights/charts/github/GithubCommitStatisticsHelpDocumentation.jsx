import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";
function GithubCommitStatisticsHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Commit Statistics"}
        >
            <div>
                <div className={"mt-2"}>
                    <div><b>The Base KPI has 3 data blocks:</b> </div>
                </div>
                <div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Total Commits </b> - Total number of commits made by developers within a selected time range.</li>
                        <li><b>Total Pull Requests</b> - Total number of PRs raised by developers within a selected time range. </li>
                        <li><b>Merged Pull Requests</b> - Total number of PRs that have been approved and merged within a selected time range.</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><b>Approved PRs by Project</b> - A pie chart that splits and shows the number of PRs by project that have been approved. </li>
                        <li><b>Active Contributors by Total Merges </b> - A bar chart depicting the top 5 active contributors who have been actively raising PRs for their changes.</li>
                        <li><b>Declined Pull Requests by Project</b> - Pie chart sliced by project to show the total number of PRs that have been declined by reviewers. </li>
                    </ul>
                </div>
                <div>
                    Each slices in the pie chart can be clicked to see the details of the PRs.<br></br>
                    This KPI has a drill down report that shows the list of Open/Closed PRs by Application along with the list of contributors for each application.
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubCommitStatisticsHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubCommitStatisticsHelpDocumentation);