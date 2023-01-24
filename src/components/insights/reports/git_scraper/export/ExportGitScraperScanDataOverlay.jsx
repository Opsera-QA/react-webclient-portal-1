import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";

function ExportGitScraperScanDataOverlay({ formattedData, rawData, isLoading }) {
    const getRawData = () => {
        return new Blob([rawData], { type: 'text/plain' });
    };

    const getPdfExporter = () => {
        const pdfExporter = new jsPDF({ orientation: "landscape" });
        pdfExporter.autoTable({
            startY: 2,
            styles: { fontSize: 8, minCellWidth: 24, minCellHeight: 12, valign: 'middle' },
            showHead: "firstPage",
            headStyles: { fontSize: 8, minCellWidth: 24, fillColor: [54, 46, 84] },
            margin: { left: 2, right: 2 },
            head: [["Path", "Author", "Line Number", "Commit", "Commit Date", "Reason", "Repository", "Branch"]],
            body: formattedData.map(item => [item.path, item.author, item.lineNumber, item.commit, item.commitDate, item.reason, item.repository, item.branch])
        });

        return pdfExporter;
    };

    const getCsvData = () => {
        return [["Path", "Author", "Line Number", "Commit", "Commit Date", "Reason"],
            ...formattedData.map(item =>
                [
                    item.path,
                    item.author,
                    item.lineNumber,
                    item.commit,
                    item.commitDate,
                    item.reason,
                ]
            )];
    };

    return (
        <ExportDataOverlay
            isLoading={isLoading}
            getRawData={getRawData}
            getPdfExporter={getPdfExporter}
            getCsvData={getCsvData}
        />
    );
}

ExportGitScraperScanDataOverlay.propTypes = {
    dataToExport: PropTypes.any,
    rawData: PropTypes.any,
    formattedData: PropTypes.any,
    isLoading: PropTypes.bool,
    exportFrom: PropTypes.any,
};

export default ExportGitScraperScanDataOverlay;
