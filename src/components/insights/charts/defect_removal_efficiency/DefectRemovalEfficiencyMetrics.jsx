import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./defectRemovalEfficiencyMetricsConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import { defaultConfig, getColorByData, assignStandardColors, shortenPieChartLegend } from "../charts-views";
import { Col, Row } from "react-bootstrap";
import DefectRemovalEfficiencyPercentageDataBlock from "./data_blocks/DefectRemovalEfficiencyPercentageDataBlock";
import DefectRemovalEfficiencyDataBlockBase from "./data_blocks/DefectRemovalEfficiencyDataBlockBase";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

const DEFECT_REMOVAL_EFFICIENCY = "defect_removal_efficiency";

function DefectRemovalEfficiencyMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [defectRemovalEfficiencyDataPoint, setDefectRemovalEfficiencyDataPoint] = useState(undefined);

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

  const loadChartMetrics = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      cancelSource,
      "defectRemovalEfficiency",
      kpiConfiguration,
      dashboardTags
    );
    let dataObject = response?.data ? response?.data?.data[0]?.defectRemovalEfficiencyData?.data : [];
    assignStandardColors(dataObject[0]?.pairs);
    shortenPieChartLegend(dataObject[0]?.pairs);

    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const defectRemovalEfficiencyPercentageDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      DEFECT_REMOVAL_EFFICIENCY
    );
    setDefectRemovalEfficiencyDataPoint(defectRemovalEfficiencyPercentageDataPoint);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await loadChartMetrics(cancelSource);
      await loadDataPoints(cancelSource);
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

  const getChartBody = () => {
    if (!Array.isArray(metrics[0]?.pairs) || metrics[0]?.pairs.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-1" style={{ minHeight: "300px", display: "flex" }}>
        <Row>
          <Col xl={6} lg={6} md={8} className={"d-flex align-content-around"}>
            <Row className="px-4 justify-content-between">
              <Col xl={6} lg={6} sm={6} className={"my-1"}>
                <DefectRemovalEfficiencyDataBlockBase
                  score={metrics[0]?.testingPhaseDefects}
                  subtitle={"Defects in Testing Phase"}
                />
              </Col>
              <Col xl={6} lg={6} sm={6} className={"my-1"}>
                <DefectRemovalEfficiencyPercentageDataBlock
                  score={metrics[0]?.dre}
                  dataPoint={defectRemovalEfficiencyDataPoint}
                />
              </Col>
              <Col xl={6} lg={6} sm={6} className={"my-1"}>
                <DefectRemovalEfficiencyDataBlockBase score={metrics[0]?.uatDefects} subtitle={"Defects in UAT"} />
              </Col>
              <Col xl={6} lg={6} sm={6} className={"my-1"}>
                <DefectRemovalEfficiencyDataBlockBase
                  score={metrics[0]?.postProductionDefects}
                  subtitle={"Defects in Post Production"}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={6} md={4} className={"my-1"}>
            <ResponsivePie
              data={metrics[0]?.pairs}
              {...defaultConfig()}
              {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
              onClick={() => setShowModal(true)}
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
      <ModalLogs
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

DefectRemovalEfficiencyMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default DefectRemovalEfficiencyMetrics;
