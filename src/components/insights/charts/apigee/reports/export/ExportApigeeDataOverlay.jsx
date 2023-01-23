import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataOverlay from "components/common/modal/export_data/ExportDataOverlay";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import apigeeActions from "../../apigee.action";

function ExportApigeeDataOverlay({ kpiConfiguration, dashboardTags, filterDto, pipelineId }) {

  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [rawData, setRawData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [error, setError] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [kpiConfiguration, dashboardTags, filterDto, pipelineId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadReportData(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadReportData = async (cancelSource) => {
    const response = await apigeeActions.downloadReport(
      getAccessToken,
      cancelSource,
      kpiConfiguration,
      dashboardTags,
      filterDto,
      pipelineId
    );
    let dataObject = response?.data?.data?.data?.[0];
    if (isMounted?.current === true && dataObject && Array.isArray(dataObject?.report)) {
      setRawData(dataObject?.report);
      setFormattedData(dataObject?.report);
    }
  };

  const getRawData = () => {
    return new Blob([JSON.stringify(rawData)], { type: 'text/plain' });
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: { fontSize: 8, minCellWidth: 24, minCellHeight: 12, valign: 'middle' },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 24, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [["Organization", "Environment", "Total Assets Deployed", "New Assets", "Updated Assets"]],
      body: formattedData.map(item => [item.organization, item.environment, item.totalAssetsDeployed, item.newAssets, item.updatedAssets])
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [["Organization", "Environment", "Total Assets Deployed", "New Assets", "Updated Assets"],
    ...formattedData.map(item =>
      [
        item.organization,
        item.environment,
        item.totalAssetsDeployed,
        item.newAssets,
        item.updatedAssets,
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

ExportApigeeDataOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardTags: PropTypes.array,
  filterDto: PropTypes.object,
  pipelineId: PropTypes.string,
};

export default ExportApigeeDataOverlay;
