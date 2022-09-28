import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "./ExportDataOverlay";
import jsPDF from "jspdf";
import chartsActions from "components/insights/charts/charts-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function ExportGitCustodianVulnerabilitiesDataOverlay({ gitCustodianData }) {
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const [isLoading, setIsLoading] = useState(false);
  const [issuesData, setIssuesData] = useState([]);

  useEffect(() => {
    fetchDownloadData().catch(() => {});
  }, [gitCustodianData]);

  const getRawData = () => {
    return new Blob([JSON.stringify(issuesData)], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 30, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 30, fillColor: [54, 46, 84]},
      margin: { left: 1, right: 1 },
      head:[["Date Created", "Repository", "Author", "Path", "Line Number", "Origin", "Type", "Jira Ticket"]],
      body: issuesData.map((item) => [item.commitDate.substring(0, 10), item.repository, item.author, item.path, item.lineNumber, item.service, item.type, item?.jiraTicket?.key])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Date Created", "Repository", "Author", "Path", "Line Number", "Origin", "Type", "Jira Ticket"],
      ...issuesData.map((item) =>
        [
          item.commitDate.substring(0, 10), 
          item.repository, 
          item.author, 
          item.path, 
          item.lineNumber, 
          item.service, 
          item.type, 
          item?.jiraTicket?.key]
      )];
  };

  const fetchDownloadData = async () => {
    try {
      setIsLoading(true);
      const response = await chartsActions.exportGitCustodianData(
        getAccessToken,
        cancelTokenSource,
        gitCustodianData,
      );
      const newIssues = response?.data?.data?.data;

      if (Array.isArray(newIssues)) {
        setIssuesData([...newIssues]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorBanner(error, "Error Pulling Git Custodian Export Data:");
        toastContext.clearOverlayPanel();
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
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

ExportGitCustodianVulnerabilitiesDataOverlay.propTypes = {
  gitCustodianData: PropTypes.object,
};

export default ExportGitCustodianVulnerabilitiesDataOverlay;


