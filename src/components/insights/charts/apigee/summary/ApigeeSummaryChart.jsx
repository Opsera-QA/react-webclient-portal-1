import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import apigeeActions from "../apigee.action";
import ApigeeSummaryDetails from "./ApigeeSummaryDetails";

function ApigeeSummaryChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [transferData, setTransferData] = useState({});
  const [deployData, setDeployData] = useState({});
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const response = await apigeeActions.getSummaryChartDetails(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
      );
      const metrics1 = response?.data?.data?.data;

      if (isMounted?.current === true && Array.isArray(metrics1)) {
        setMetrics(metrics1);
        setTransferData(getData(metrics1, "transfer"));
        setDeployData(getData(metrics1, "deploy"));
      }
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

  const getData = (metricsData, type) => {
    if (metricsData.length > 0) {
      const metrics = metricsData[0];
      return {
        current: metrics?.currentData?.[type],
        previous: metrics?.previousData?.[type],
        trend: metrics?.trend?.[type],
      };
    }
    return {};
  };

  const getChartBody = () => {
    return (
      <>
        <div className="new-chart mb-3 mr-3 ml-3 p-0 all-github-actions-data-block">
          <ApigeeSummaryDetails kpiConfiguration={kpiConfiguration} summaryData={transferData} isLoading={isLoading} type="Transfer" />
          <ApigeeSummaryDetails kpiConfiguration={kpiConfiguration} summaryData={deployData} isLoading={isLoading} type="Deploy" />
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="APIGEE Summary"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ApigeeSummaryChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default ApigeeSummaryChart;
