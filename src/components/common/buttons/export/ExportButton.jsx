import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {rawDataDownload} from "components/common/buttons/export/exportHelpers";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TODO: If this will include both the csv and pdf exports, add an option for .csv and trigger based on prop. OR make two separate buttons.
function ExportDataButton({isLoading, variant, size, className, dataToExport, fileName, exportFrom, showButtonText, summaryData, logData}) {
  const [csvData, setCsvData] = React.useState([]);
  const csvLink = React.createRef();
  const exportDataToPdf = () => {

    if(dataToExport instanceof Blob){
      rawDataDownload(dataToExport, fileName);
    }

    if(exportFrom === "blueprint" && !(dataToExport instanceof Blob)){
      const pdfExporter = new jsPDF();

      if(summaryData){
        let stepSummary = logData?.map((step, index) => {
          let toolIdentifier = step?.tool_identifier ? step.tool_identifier : "unavailable";
          let tool = step?.step_configuration?.configuration?.toolName ? step.step_configuration.configuration.toolName : toolIdentifier;
          let stepNameFromLog = dataToExport[index]?.name ? dataToExport[index].name : "unavailable";
          let stepNameFromTab = step?.step_configuration?.configuration?.jobType ? step.step_configuration.configuration.jobType : stepNameFromLog;

          return  [`Step ${index + 1}: ${capitalize(stepNameFromTab)}`, `Tool: ${capitalize(tool)}`,`Action: ${step?.action}`];
        });

        pdfExporter.autoTable({
          startY: 2,
          headStyles:{fillColor: [54, 46, 84], fontSize: 12, fontStyle: 'normal', minCellHeight: 12, valign: 'middle'},
          showHead: "firstPage",
          margin: { left: 2, right: 2, bottom: 2 },
          head: [{id:{content:`${summaryData?.blueprintName}`, colSpan: 3}}],
          body: [{id:{content: `View Pipeline: ${window.location.origin}/workflow/details/${logData[0]?.pipeline_id}/summary`, colSpan: 3 }},
                [`ID: ${summaryData?.pipelineId}`, `Pipeline Run Count: ${summaryData?.runCount}`, `Number of Steps: ${summaryData?.numberOfSteps}`],
                [`Status: ${capitalize(logData[0]?.status)}`, `Last Run: ${logData[0]?.createdAt}`,`Report Date: ${new Date().toLocaleDateString('en-US')}` ],
                ...stepSummary],
        });

        dataToExport.forEach((step, index) => {
          let stepName = logData[index]?.step_configuration?.configuration?.jobType ? logData[index].step_configuration.configuration.jobType : step.name.charAt(0).toUpperCase() + step.name.slice(1);

          return(
            pdfExporter.autoTable({
              headStyles:{fillColor: [54, 46, 84], fontStyle: 'normal', fontSize: 10, valign:'middle'},
              showHead: "firstPage",
              margin: { top: 2, left: 2, right: 2, bottom: 2 },
              head: [[stepName]],
              body: [[step.step]]
            })
          );
        });
      } else {
        pdfExporter.autoTable({
          startY: 2,
          headStyles:{fillColor: [54, 46, 84]},
          showHead: "firstPage",
          margin: { left: 2, right: 2 },
          head: [["Blueprint"]],
          body: dataToExport.map(result => [result])
        });
      }

      pdfExporter.save(fileName);
    }

    if(exportFrom === "log_search" && !(dataToExport instanceof Blob)){
      const searchResults = dataToExport;
      const pdfExporter = new jsPDF();
      const resultsToExport = searchResults[0].hits;
      
      pdfExporter.autoTable({
        startY: 2,
        headStyles:{fillColor: [54, 46, 84]},
        showHead: "firstPage",
        margin: { left: 2, right: 2 },
        head:[["Logs Search Results"]],
        body: resultsToExport.map(item => [JSON.stringify(item, null, 2)])
      });

      pdfExporter.save(fileName);
    }

    if(exportFrom === "activity_log" && !(dataToExport instanceof Blob)){
      const pdfExporter = new jsPDF({orientation: "landscape"});
      pdfExporter.autoTable({
        startY: 2,
        styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
        showHead: "firstPage",
        headStyles:{fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
        columnStyles: { 0: { halign: 'center'} },
        margin: { left: 2, right: 2 },
        head:[["Run Count","Action","Task","Tool","Message","Status","Created"]],
        body: dataToExport.map(item => [item.run_count, item.action, item.step_name, item.tool_identifier, item.message, item.status, item.createdAt])
      });

      pdfExporter.save(fileName);
    }

    if(exportFrom === "reports" && !(dataToExport instanceof Blob) && !dataToExport.csv){
      const pdfExporter = new jsPDF({orientation: "landscape"});
      pdfExporter.autoTable({
        startY: 2,
        styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
        showHead: "firstPage",
        headStyles:{fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
        margin: { left: 2, right: 2 },
        head:[["Name","ID","Description","Created","Updated","Status"]],
        body: dataToExport.map(item => [item.name, item._id, item.description, item.createdAt, item.updatedAt, item.active ? "active" : "inactive"])
      });

      pdfExporter.save(fileName);
    }

    if(exportFrom === "reports" && dataToExport.csv){
      const setCsvDownload = () => {
        let tagData = dataToExport.formattedData;
        let csvDownloadData = [["Name","ID","Description","Created","Updated","Status"], ...tagData.map(item => [item.name, item._id, item.description, item.createdAt, item.updatedAt, item.active ? "active" : "inactive"])];
        setCsvData(csvDownloadData);
      };

      const exportCsv = async() =>{
        setCsvDownload();
        let newLink = await csvLink.current.link;
        newLink.click();
      };

      exportCsv();
    }
   
  };

  const getButtonText = () => {
    if (showButtonText === true) {
      return (
        <span><FontAwesomeIcon icon={faFileDownload} fixedWidth className={"mr-1"}/>Export Data</span>
      );
    }

    return <span><FontAwesomeIcon icon={faFileDownload} fixedWidth /></span>;
  };

  return (
    <div>
      <TooltipWrapper innerText={"Export Data"}>
        <div className={className}>
          <Button variant={variant} size={size} disabled={isLoading} onClick={() => exportDataToPdf()}>
            {getButtonText()}
          </Button>
        </div>
      </TooltipWrapper>
      <CSVLink data={csvData} filename={fileName} ref={csvLink}/>
    </div>
  );
}

ExportDataButton.propTypes = {
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  fileName: PropTypes.string,
  dataToExport: PropTypes.any,
  exportFrom: PropTypes.any,
  summaryData: PropTypes.any,
  logData: PropTypes.any,
  showButtonText: PropTypes.bool
};

export default ExportDataButton;