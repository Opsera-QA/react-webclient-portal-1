import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function LeadTimeAndReleaseTraceabilityHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Lead Time and Release Traceability"}
        >
            <div>
                <div className={"mb-2"}>This KPI measures the lead time and deployment frequency to production environments along with the time it takes to make the first commit.</div>
                <div className={"mt-2"}>
                    <div><b>The base KPI has 3 data blocks:</b> </div>
                </div>
                <div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Lead Time</b> -  The time it takes from code commit to production deployment (E3).</li>
                        <li><b>Deployment Frequency</b> - The frequency of daily deployments to production, that happened for a given period of time.</li>
                        <li><b>Average time to First commit</b> - The average time it takes to make the first commit to branch once the branch is created.</li>
                    </ul>
                </div>
                <div>All three data blocks have the trend icon that depicts the trend compared to the previous results for the same time range selected. It also shows the previous result, providing the capability to compare between two equal time ranges. </div>
                <div className={"mt-2"}>
                    <div><b>Drill Down Reports:</b> </div>
                </div>
                <div>
                    This KPI has one page drill down report, next to the KPI settings icon.<br></br>
                    The drill down report shows the total number and average of commits, repositories modified, merges, and deployments that happened.
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

LeadTimeAndReleaseTraceabilityHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(LeadTimeAndReleaseTraceabilityHelpDocumentation);