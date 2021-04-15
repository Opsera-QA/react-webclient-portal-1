import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

// TODO: Should we be just sending in data and formatting in here?
function ExportDetailedToolReportDataModal({ showModal, closeModal, formattedData, rawData, isLoading}) {
  const getRawData = () => {
    return new Blob([rawData], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
      margin: { left: 2, right: 2 },
      head:[["Name","Owner","Description","Contacts","Applications","Location","Organization","Tags","External References","Licensing","Compliance","Cost Center","Active"]],
      body: formattedData.map(item => [item.name, item.owner_name, item.contact, item.applications, item.location, item.organization, item.tags, item.external_references, item.licensing, item.compliance, item.costCenter, item.active])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    const output = [];

    formattedData.forEach((tool) => {
      const contacts = Array.isArray(tool?.contacts) ? tool?.contacts?.map(contact => `${contact?.name} : ${contact?.email}`).toString() : "";
      const applications = Array.isArray(tool?.applications) ? tool?.applications?.map(app => `${app?.name} : ${app?.value}`).toString() : "";
      const locations = Array.isArray(tool?.location) ? tool?.location?.map(location => `${location?.name} : ${location?.value}`).toString() : "";
      const organizations = Array.isArray(tool?.organization) ? tool?.organization?.map(org => `${org?.name} : ${org?.value} `).toString() : "";
      const tags = Array.isArray(tool?.tags) ? tool?.tags?.map(tag => `${tag?.type} : ${tag?.value}`).toString() : "";
      const external_references = Array.isArray(tool?.external_reference) ? tool?.external_reference?.map(ref => ref?.name).toString() : "";
      const licensing = Array.isArray(tool?.licensing) ? tool?.licensing?.map(license => `${license?.name} : ${license.value}`) : "";
      const compliance = Array.isArray(tool?.compliance) ? tool.compliance?.map(item => `${item?.name} : ${item.value}`) : "";

      output.push(
        [
          tool.name,
          tool.owner_name,
          tool.description,
          contacts,
          applications,
          locations,
          organizations,
          tags,
          external_references,
          licensing,
          compliance,
          tool?.costCenter,
          tool.active
        ]
      );
    });


    return [["Name", "Owner", "Description", "Contacts", "Applications", "Location", "Organization", "Tags", "External References", "Licensing", "Compliance", "Cost Center", "Active"],
      ...output
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


