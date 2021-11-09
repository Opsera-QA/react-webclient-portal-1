// Analytics  Security Tab, Dashboard, Node Ticket AN-48 and AN-49 (persona : Developer/Manager/Executive)

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "components/insights/charts/sonar/line_chart/reliability_remediation_effort_by_project/sonarReliabilityRemediationEffortByProjectLineChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
// import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
// import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  defaultConfig,
  getColor,
  assignStandardColors,
  shortenLegend,
} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import VanityTable from "components/common/table/VanityTable";
// import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import {
  // getChartPipelineStatusColumn,
  // getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import LoadingDialog from "components/common/status_notifications/loading";

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
function SonarReliabilityRemediationEffortByProjectLineChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  sonarMeasure,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let toastContext = useContext(DialogToastContext);
  const fields = [
    { id: "project", label: "Project Name" },
    { id: "x", label: "Date" },
    { id: "y", label: "Remediation Effort Required (min)" },
  ];
  const columns = [
    getTableTextColumn(getField(fields, "project")),
    getTableTextColumn(getField(fields, "x")),
    getTableTextColumn(getField(fields, "y")),
  ];

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
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarReliabilityRemediationEffortByProject",
        kpiConfiguration,
        dashboardTags
      );
      const dataObject =
        response?.data &&
        response?.data?.data[0]?.sonarReliabilityRemediationEffortByProject
          .status === 200
          ? response?.data?.data[0]?.sonarReliabilityRemediationEffortByProject
              ?.data
          : [];
      assignStandardColors(dataObject);
      shortenLegend(dataObject);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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
  /**
   * @param {Object} node
   * getArrayOfProjects go over metrics and get the array of data for an specific project
   */
  const getArrayOfProject = (node) => {
    for (let project of metrics) {
      if (node.serieId === project.id) {
        return project.data;
      }
    }
  };
  /**
   * @param {Array} projectArr
   * the array gotten from the server can have entries with the correct format but empty values
   * filterSelectedProjectArr remove those objects and return an array with valid data
   */
  const filterSelectedProjectArr = (projectArr) => {
    let projectsWithData = [];
    for (let entry of projectArr) {
      if (entry.x !== null && entry.y !== null) {
        projectsWithData.push(entry);
      }
    }
    return projectsWithData;
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = (grid, row) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay
        pipelineId={row.pipelineName}
        runCount={row.run_count}
      />
    );
  };

  const getBody = (arr) => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Loading Data"} />;
    }

    return (
      <VanityTable
        className={"no-table-border"}
        data={arr}
        columns={columns}
        onRowSelect={onRowSelect}
      />
    );
  };

  const nodeClickHandler = (node) => {
    let arrayOfProject = getArrayOfProject(node);
    let dataForTable = filterSelectedProjectArr(arrayOfProject);
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={node.data.project}
        showToasts={true}
        isLoading={false}
        linkTooltipText={"View Full Blueprint"}
      >
        <div className={"p-3"}>{getBody(dataForTable)}</div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <ResponsiveLine
          data={metrics}
          {...defaultConfig(
            "Remediation Effort Required (min)",
            "Date",
            false,
            true,
            "wholeNumbers",
            "monthDate"
          )}
          {...config(getColor)}
          onClick={(node) => {
            nodeClickHandler(node);
          }}
          tooltip={(node) => {
            return (
              <ChartTooltip
                titles={["Project", "Date", "Remediation Effort Required"]}
                values={[
                  node.point.data.project,
                  node.point.data.xFormatted,
                  String(node.point.data.yFormatted) + " minutes",
                ]}
              />
            );
          }}
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
    </div>
  );
}

SonarReliabilityRemediationEffortByProjectLineChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  sonarMeasure: PropTypes.string,
};

export default SonarReliabilityRemediationEffortByProjectLineChart;
