import React, { useState, useEffect, useContext, useRef } from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";
import AutomationPercentagePieChart from "components/insights/charts/qa_metrics/AutomationPercentagePieChart";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import { AuthContext } from "contexts/AuthContext";
import kpiFilterMetadata from "components/admin/kpi_editor/kpi-filter-metadata";
import Model from "core/data_model/model";
import AdoptionPercentagePieChart from "components/insights/charts/qa_metrics/AdoptionTestPercentagePieChart";
import ManualQaTestPieChart from "components/insights/charts/qa_metrics/CummulativeOpenDefectsPieChart";
import FirstPassYieldPieChart from "components/insights/charts/qa_metrics/FirstPassYieldPieChart";
import DefectRemovalEfficiencyPieChart from "components/insights/charts/qa_metrics/DefectRemovalEfficiencyPieChart";
import SonarRatingMetrics from "components/insights/charts/sonar/sonar_ratings/SonarRatingMetrics";
import { Col, Row } from "react-bootstrap";

function OverallReleaseQualityMetrics({ dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFiterModel] = useState(undefined);
  const [kpiList, setKpiList] = useState(undefined);
  const [kpiConfig, setKpiConfig] = useState(undefined);
  const [marketplaceFilterDto, setMarketplaceFilterDto] = useState(undefined);
  const [kpiFilterDto, setKpiFilterDto] = useState(
    new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
  );

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
  }, []);

  // TODO: If these are separate data pulls,
  //  put the pulls inside the relevant data block components to keep concerns properly separated.
  //  Each data block component should be a separate react component and use the new base ones to keep everything consistent.
  //  If you need something different, feel free to ask me (Noah).
  //  I can also work with you to get this wired up properly once I have an example if needed
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await getOverallReleaseQualityMetrics(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  // const getOverallReleaseQualityMetrics = async (cancelSource = cancelTokenSource) => {
  //   const response = await KpiActions.getKpiById(getAccessToken, cancelSource, "automation-percentage");

  //   // const response = await KpiActions.getKpisV2(getAccessToken, cancelSource, kpiFilterDto);

  //   if (isMounted?.current === true && response?.data?.data) {
  //     setKpiConfig(response?.data?.data.find((item) => item.identifier == "automation-percentage"));

  //     setKpiList(response.data.data);
  //     let newFilterDto = kpiFilterDto;
  //     newFilterDto.setData("totalCount", response.data.count);
  //     newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
  //     setKpiFilterDto({ ...newFilterDto });
  //   }
  // };

  const filters = {
    filters: [
      {
        type: "date",
        value: {
          startDate: "2020-01-20T20:07:35.041Z",
          endDate: "2022-01-20T20:07:35.041Z",
          key: "selection",
        },
      },
    ],
  };

  const getMetricBlocks = () => {
    return (
      <div>
        <DataBlockBoxContainer className={"mr-2"}>
          <Row className="p-1">
            <Col>
              <AutomationPercentagePieChart
                kpiConfiguration={{
                  kpi_name: "Automation Percentage",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
            <Col>
              <AdoptionPercentagePieChart
                kpiConfiguration={{
                  kpi_name: "Adoption Percentage",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <ManualQaTestPieChart
                kpiConfiguration={{
                  kpi_name: "Cumulative Open Defects",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
            <Col>
              <DefectRemovalEfficiencyPieChart
                kpiConfiguration={{
                  kpi_name: "Defect Removal Efficiency",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <FirstPassYieldPieChart
                kpiConfiguration={{
                  kpi_name: "First Pass Yield",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
            <Col>
              <SonarRatingMetrics
                kpiConfiguration={{
                  kpi_name: "Sonar Ratings",
                  ...filters,
                }}
                dashboardData={dashboardData}
                showSettingsToggle={false}
              />
            </Col>
          </Row>
        </DataBlockBoxContainer>
      </div>
    );
  };

  if (isLoading === true) {
    return <LoadingDialog message={"Loading Metrics"} />;
  }

  return <div className={"mt-2"}>{getMetricBlocks()}</div>;
}

OverallReleaseQualityMetrics.propTypes = {
  dashboardId: PropTypes.string,
  dashboardData: PropTypes.object,
};

export default OverallReleaseQualityMetrics;
