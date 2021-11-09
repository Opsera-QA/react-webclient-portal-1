// Analytics  Security Tab, Dashboard, Node Ticket AN-48 and AN-49 (persona : Developer/Manager/Executive)

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "components/insights/charts/sonar/line_chart/metric-by-project/sonarMetricByProjectLineChartConfigs";
import React, {useState, useEffect, useContext, useRef} from "react";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import { defaultConfig, getColor, assignStandardColors, shortenLegend } from '../../../charts-views';
import ChartTooltip from '../../../ChartTooltip';

/**
 *
 * @param {sonarMeasure} param0
 * allowed values
 * "bugs", "classes", "code_smells", "cognitive_complexity", "comment_lines", "comment_lines_density", "complexity",
  "confirmed_issues", "coverage", "duplicated_blocks", "duplicated_files", "duplicated_lines", "duplicated_lines_density",
  "false_positive_issues", "files", "functions", "line_coverage", "lines", "lines_to_cover", "ncloc", "ncloc_language_distribution",
  "open_issues", "reliability_rating", "reliability_remediation_effort", "reopened_issues", "security_rating", "security_remediation_effort",
  "sqale_debt_ratio", "sqale_index", "sqale_rating", "statements", "uncovered_lines", "violations", "vulnerabilities",
  "new_bugs", "new_code_smells", "new_lines_to_cover", "new_reliability_remediation_effort", "new_security_remediation_effort", "new_sqale_debt_ratio",
  "new_technical_debt", "new_uncovered_conditions", "new_uncovered_lines", "new_violations", "new_vulnerabilities", "new_coverage",
  "new_line_coverage", "skipped_tests", "test_errors", "test_execution_time", "test_failures", "test_success_density", "tests",
 */
function SonarMetricByProjectLineChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis, sonarMeasure }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarMeasures-" + sonarMeasure, kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.["sonarMeasures-" + sonarMeasure].status === 200 ? response?.data?.data[0]?.["sonarMeasures-" + sonarMeasure]?.data : [];
      assignStandardColors(dataObject);
      shortenLegend(dataObject);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const formatTitle = (str) => {
    var i, frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
            <ResponsiveLine
              data={metrics}
              {...defaultConfig("Vulnerabilities", "Date", 
                    false, true, "wholeNumbers", "monthDate")}
              {...config(getColor)}
              onClick={() => setShowModal(true)}
              tooltip={(node) => <ChartTooltip 
                    titles={["Status", "Qualifier", "Date", capitalizeFirstLetter(node.point.data.metric)]}
                    values={[node.point.data.status, node.point.data.gate, 
                             node.point.data.xFormatted, node.point.data.yFormatted]} />}
            />        
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
        header={formatTitle(sonarMeasure)}
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}


SonarMetricByProjectLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  sonarMeasure: PropTypes.string
};

export default SonarMetricByProjectLineChart;

