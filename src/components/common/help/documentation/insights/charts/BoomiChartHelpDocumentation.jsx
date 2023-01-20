import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function BoomiChartHelpDocumentation({closeHelpPanel}) {
    return (
        <HelpDocumentationContainer
            closeHelpPanel={closeHelpPanel}
            helpTopic={"Boomi Pipeline Executions"}
        >
            <div>
                <div className={"mb-2"}>This chart reflects the number of Boomi components deployed, its frequency and success percentage.</div>
                <div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Base KPI:</b></li>
                        <ul>
                            <li><b>Successful Execution Rate</b> - Percentage of components successfully deployed . </li>
                            <li><b>Frequency</b> - Average number of components deployed.</li>
                            <li><b>Boomi Line Chart</b> - Failed and Successful components deployed over a given time period.</li>
                        </ul>
                        <li></li>
                        <li><b>Actionable Insights:</b> shows three separate tabs for the three main Boomi steps: Create Package, Deploy Package and Migrate Package</li>
                        <ul>
                            <li><b>Total Executions</b> - Total number of executions . </li>
                            <li><b>Successful Execution Rate</b> - Percentage of components/packages successfully deployed . </li>
                            <li><b>Frequency</b> - Average number of components/packages deployed per day.</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </HelpDocumentationContainer>
    );
}

BoomiChartHelpDocumentation.propTypes = {
    closeHelpPanel: PropTypes.func,
};

export default React.memo(BoomiChartHelpDocumentation);