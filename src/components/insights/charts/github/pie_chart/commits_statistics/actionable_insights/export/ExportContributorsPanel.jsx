import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";

export default function ExportContributorsPanel({ showExportPanel, setShowExportPanel, LookupDetailsData, isLoading}) {
    const getRawData = () => {
        const rawData = Array.isArray(LookupDetailsData)
            ? LookupDetailsData?.map((item) => JSON.stringify(item))
            : "export failure";
        return new Blob([rawData], {type: "text/plain"});
    };

    const getPdfExporter = () => {
        const pdfExporter = new jsPDF({orientation: "landscape"});
        pdfExporter.autoTable({
            startY: 2,
            styles: {
                fontSize: 9,
                minCellWidth: 19,
                minCellHeight: 12,
                valign: "middle",
            },
            showHead: "firstPage",
            headStyles: {fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
            margin: {left: 2, right: 2},
            head: [
                [
                    "Reviewer Name",
                    "Total Commits",
                ],
            ],
            body: LookupDetailsData.map((item) => [
                item.reviewerName,
                item.totalCommits,
            ]),
        });

        return pdfExporter;
    };

    const getCsvData = () => {
        return [
            [
                "Reviewer Name",
                "Total Commits",
            ],
            ...LookupDetailsData.map((item) => [
                item.reviewerName,
                item.totalCommits,
            ]),
        ];
    };

    if (LookupDetailsData == null || !Array.isArray(LookupDetailsData)) {
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

ExportContributorsPanel.propTypes = {
    showExportPanel: PropTypes.bool,
    setShowExportPanel: PropTypes.func,
    LookupDetailsData: PropTypes.any,
    isLoading: PropTypes.bool,
};