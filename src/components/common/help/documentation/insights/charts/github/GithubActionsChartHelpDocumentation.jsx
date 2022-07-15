import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GithubActionsChartHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Github Actions"}
        >
            <div>
                <div className={"mb-2"}>This KPI brings out the execution statistics on all Github Actions, along with including the stage-wise totals.</div>
                <div className={"mt-2"}>
                    <div><b>The Base KPI has 3 data blocks:</b> </div>
                </div>
                <div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Success %</b> - Denotes the percentage of workflows that have succeeded. The data block has a trend that shows the comparison based on the previous time range, along with the previous results equal to the time range.</li>
                        <li><b>Total Success Executions</b> - Total number of successful workflows being executed within a defined time range. </li>
                        <li><b>Total Failed Executions</b> -  Total number of failed workflows within a defined time range.</li>
                    </ul>
                </div>
                <div className={"mt-2"}>
                    <div><b>Drill Down Reports:</b> </div>
                </div>
                <div>
                    Each data block has its own drill down capabilities.
                </div>
                <div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Success %</b> - Shows the percentage of workflows split by various events, success/failed/cancelled/skipped.</li>
                        <li><b>Total Success Executions</b> - Detailed drill down report on all the successful executions of each workflows, along with a summary that splits the count based on various critical stages in a workflow. The summarized view above shows the total count at various stages, and right below is a table view with a list of application names, and its corresponding list of executions in detail.</li>
                        <li><b>Total Failed Executions</b> -  Detailed drill down report on all failed executions of each workflows, along with a summary view. The summarized values adheres to the failed counts at all stages of the workflows, followed by a list of applications with its corresponding list of executions and the point of failure. Each workflow execution can be clicked to see the head commit details, in order to trace back to the list of commits made to trigger this workflow action.</li>
                    </ul>
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

GithubActionsChartHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(GithubActionsChartHelpDocumentation);