import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";
import jsPDF from "jspdf";
import chartsActions from "components/insights/charts/charts-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function ExportDependencyListOverlay({ dataModel }) {
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();
  const [isLoading, setIsLoading] = useState(false);
  const [dependentListData, setDependentListData] = useState([]);

  useEffect(() => {
    fetchDownloadData().catch(() => {});
  }, [dataModel]);

  const getRawData = () => {
    return new Blob([JSON.stringify(dependentListData)], {type : 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 30, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles:{fontSize: 8, minCellWidth: 30, fillColor: [54, 46, 84]},
      margin: { left: 1, right: 1 },
      head:[["committedFileId", "componentName", "componentType", "refComponentId", "refComponentName", "refComponentType"]],
      body: dependentListData.map((item) => [item.committedFileId, item.componentName, item.componentType, item.refComponentId, item.refComponentName, item.refComponentType])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["committedFileId", "componentName", "componentType", "refComponentId", "refComponentName", "refComponentType"],
      ...dependentListData.map((item) =>
        [
          item.committedFileId,
          item.componentName,
          item.componentType,
          item.refComponentId,
          item.refComponentName,
          item.refComponentType
        ]
      )];
  };

  const fetchDownloadData = async () => {
    try {
      setIsLoading(true);
      const response = await chartsActions.exportGitCustodianData(
        getAccessToken,
        cancelTokenSource,
        dataModel,
      );
      const allDependentList = response?.data?.data;

      if (Array.isArray(allDependentList)) {
        setDependentListData([...allDependentList]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorBanner(error, "Error Pulling Dependency Export Data:");
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

ExportDependencyListOverlay.propTypes = {
  dataModel: PropTypes.object,
};

export default ExportDependencyListOverlay;


