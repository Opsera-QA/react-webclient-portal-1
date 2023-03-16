import React from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "../../common/modal/export_data/ExportDataOverlay";
import jsPDF from "jspdf";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

// TODO: Should we be just sending in data and formatting in here?
function ExportProjectsByTagsReportDataOverlay({ formattedData, rawData, isLoading}) {
  const columns = ["ID", "Name", "Tool Type", "Created", "Updated", "Tags"];

  const formattedDataBody = Array.isArray(formattedData)
    ? formattedData.map(item => [
        item._id,
        item.key,
        item.tool_identifier,
        DateFormatHelper.formatDateAsTimestampWithoutSeconds(item.createdAt),
        DateFormatHelper.formatDateAsTimestampWithoutSeconds(item.updatedAt),
        item.value.map(({ type, value }) => `${type}/${value}`)
      ])
    : [];

  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {
        fontSize: 9,
        minCellWidth: 19,
        minCellHeight: 12,
        valign: 'middle'
      },
      showHead: "firstPage",
      headStyles: {
        fontSize: 8,
        minCellWidth: 19,
        fillColor: [54, 46, 84]
      },
      margin: {
        left: 2,
        right: 2
      },
      head:[columns],
      body: formattedDataBody
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [columns, ...formattedDataBody];
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

ExportProjectsByTagsReportDataOverlay.propTypes = {
  dataToExport: PropTypes.any,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
  exportFrom: PropTypes.any,
};

export default ExportProjectsByTagsReportDataOverlay;