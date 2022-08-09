import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

// TODO: Should we be just sending in data and formatting in here?
function ExportDetailedToolReportDataModal({
  showModal,
  closeModal,
  formattedData,
  rawData,
  isLoading,
}) {
  const getRawData = () => {
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
          "Author",
          "Commit",
          "Commit Hash",
          "Path",
          "Line Number",
          "Link",
          "Reason",
        ],
      ],
      body: formattedData.map((item) => [
        item.author,
        item.commit,
        item.commitHash,
        item.path,
        item.lineNumber,
        item.link,
        item.reason,
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Author",
        "Commit",
        "Commit Hash",
        "Path",
        "Line Number",
        "Link",
        "Reason",
      ],
      ...formattedData.map((item) => [
        item.author,
        item.commit,
        item.commitHash,
        item.path,
        item.lineNumber,
        item.link,
        item.reason,
      ]),
    ];
  };

  if (formattedData == null || !Array.isArray(formattedData)) {
    return null;
  }

  return (
    <ExportDataModalBase
      showModal={showModal}
      handleCancelModal={closeModal}
      isLoading={isLoading}
      getRawData={getRawData}
      getCsvData={getCsvData}
    />
  );
}

ExportDetailedToolReportDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportDetailedToolReportDataModal;
