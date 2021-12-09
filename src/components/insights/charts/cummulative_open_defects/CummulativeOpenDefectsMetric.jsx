import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { assignStandardColors, shortenPieChartLegend } from "components/insights/charts/charts-views";
import { Col, Row } from "react-bootstrap";
import "components/insights/charts/qa_metrics/Styling.css";
import { hasStringValue } from "components/common/helpers/string-helpers";
import NivoPieChartBase from "components/common/metrics/charts/nivo/pie/NivoPieChartBase";
import { nivoChartLegendDefinitions } from "components/common/metrics/charts/nivo/nivoChartLegend.definitions";
import CummulativeOpenDefectsDataBlock from "./data_blocks/open_defects/CummulativeOpenDefectsDataBlock";
import CummulativeOpenValidDefectsDataBlock from "./data_blocks/open_valid_defects/CummulativeOpenValidDefectsDataBlock";
import CummulativeTotalDefectsDataBlock from "./data_blocks/total_defects/CummulativeTotalDefectsDataBlock";
import CummulativeTotalValidDefectsDataBlock from "./data_blocks/total_valid_defects/CummulativeTotalValidDefectsDataBlock";
import CummulativeOpenDefectsHelpDocumentation from "components/common/help/documentation/insights/charts/CummulativeOpenDefectsHelpDocumentation";


function CummulativeOpenDefectsMetric({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metric, setMetric] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
  const isMounted = useRef(false);
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
      await loadChartMetrics(cancelSource);
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

  const loadChartMetrics = async (cancelSource = cancelTokenSource) => {
    const notes = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "notes")]?.value;
    setNotesData(notes);
    setIsLoading(true);

    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      cancelSource,
      "cumulativeOpenDefects",
      kpiConfiguration,
      dashboardTags
    );

    const metrics = response?.data ? response?.data?.data[0]?.cumulativeOpenDefects?.data : [];

    if (Array.isArray(metrics) && metrics.length > 0) {
      const metric = metrics[0];

      assignStandardColors(metric.pairs);
      shortenPieChartLegend(metric?.pairs);

      if (isMounted?.current === true) {
        setMetric(metric);
      }
    }
  };

  const getNotesRow = () => {
    if (hasStringValue(notesData)) {
      return (
        <Col className="px-4 pb-4 text-center">
          <small> {notesData} </small>
        </Col>
      );
    }
  };

  const getLegendsConfiguration = () => {
    return [nivoChartLegendDefinitions.getTopRightLegendDefinition()];
  };

  const getChartBody = () => {
    if (!Array.isArray(metric?.pairs) || metric?.pairs.length === 0) {
      return null;
    }

    return (
      <>
        <div className="new-chart m-3 p-0" style={{ height: "300px", display: "flex" }}>
          <Row>
            <Col xl={6} lg={6} md={8} className={"d-flex align-content-around"}>
              <Row>
                <Col lg={6} className={"my-3"}>
                  <CummulativeTotalDefectsDataBlock defects={metric?.totalTests?.toString()} />
                </Col>
                <Col lg={6} className={"my-3"}>
                  <CummulativeOpenDefectsDataBlock defects={metric?.cumulativeDefects} />
                </Col>
                <Col lg={6} className={"mb-3"}>
                  <CummulativeTotalValidDefectsDataBlock defects={metric?.passedTests} />
                </Col>
                <Col lg={6} className={"mb-3"}>
                  <CummulativeOpenValidDefectsDataBlock defects={metric?.failedTests} />
                </Col>
              </Row>
            </Col>
            <Col xl={6} lg={6} md={4} className={"my-2 p-2"}>
              <NivoPieChartBase
                data={metric?.pairs}
                onClickFunction={() => setShowModal(true)}
                legendsConfiguration={getLegendsConfiguration()}
              />
            </Col>
          </Row>

          {getNotesRow()}
        </div>
      </>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        tableChart={true}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <CummulativeOpenDefectsHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metric}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

CummulativeOpenDefectsMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default CummulativeOpenDefectsMetric;
