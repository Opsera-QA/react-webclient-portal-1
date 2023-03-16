import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportGithubActionWorkflowReportActionableInsights4Panel({
                                                                                     showExportPanel,
                                                                                     setShowExportPanel,
                                                                                     githubActionData,
                                                                                     isLoading,
                                                                                 }) {
    const getRawData = () => {
        const rawData = Array.isArray(githubActionData)
            ? githubActionData?.map((item) => JSON.stringify(item))
            : "export failure";
        return new Blob([rawData], { type: "text/plain" });
    };

    const getPdfExporter = () => {
        const pdfExporter = new jsPDF({ orientation: "landscape" });
        pdfExporter.autoTable({
            startY: 2,
            styles: {
                fontSize: 9,
                minCellWidth: 19,
                minCellHeight: 12,
                valign: "middle",
            },
            showHead: "firstPage",
            headStyles: { fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84] },
            margin: { left: 2, right: 2 },
            head: [
                [
                    "Run ID",
                    "Workflow Name",
                    "Start Time",
                    "End Time",
                    "Triggered By",
                    "Event",
                    "Total Duration",
                    "Conclusion",
                    "Run Attempt #",
                ],
            ],
            body: githubActionData.map((item) => [
                item.workflowRunId,
                item.workflowName,
                item.workflowStartTime,
                item.workflowEndTime,
                item.triggeredBy,
                item.triggerEvent,
                item.totalDuration,
                item.conclusion,
                item.numberOfRuns,
            ]),
        });

        return pdfExporter;
    };

    const getCsvData = () => {
        return [
            [
                "Run ID",
                "Workflow Name",
                "Start Time",
                "End Time",
                "Triggered By",
                "Event",
                "Total Duration",
                "Conclusion",
                "Run Attempt #",
            ],
            ...githubActionData.map((item) => [
                item.workflowRunId,
                item.workflowName,
                item.workflowStartTime,
                item.workflowEndTime,
                item.triggeredBy,
                item.triggerEvent,
                item.totalDuration,
                item.conclusion,
                item.numberOfRuns,
            ]),
        ];
    };

    if (githubActionData == null || !Array.isArray(githubActionData)) {
        console.log(githubActionData);
        return null;
    }

    return (
        <ExportDataPanel
            isLoading={isLoading}
            getRawData={getRawData}
            getCsvData={getCsvData}
            getPdfExporter={getPdfExporter}
            closePanelFunction={() => setShowExportPanel(!showExportPanel)}
        />
    );
}

ExportGithubActionWorkflowReportActionableInsights4Panel.propTypes = {
    showExportPanel: PropTypes.bool,
    setShowExportPanel: PropTypes.func,
    githubActionData: PropTypes.any,
    isLoading: PropTypes.bool,
};
