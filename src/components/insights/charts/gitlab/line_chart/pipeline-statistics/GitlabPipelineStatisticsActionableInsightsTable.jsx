import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import GitlabPipelineStatisticsActionableInsightsMetadata from "./gitlabPipelineStatisticsActionableInsights.metadata";
import {
    getTableDateTimeColumn,
    getTableDurationTextColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";

import { faDraftingCompass, faCircleInfo, faTimer, faLightbulbOn } from "@fortawesome/pro-light-svg-icons";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import GitlabPipelineInsightsDataBlock from "./GitlabPipelineInsgihtsDataBlock";
import {getTimeDisplay} from "../../../charts-helpers";

function GitlabPipelineStatisticsActionableInsightsTable({ kpiConfiguration, insightsData,  activeTab }) {
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );

  const noDataMessage = "Gitlab Pipeline report is currently unavailable";

  const fields = GitlabPipelineStatisticsActionableInsightsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipelineId")),
      getTableTextColumn(getField(fields, "branch")),
      getTableDurationTextColumn(getField(fields, "pipelineDuration")),
      getTableTextColumn(getField(fields, "overallStatus")),
      getTableTextColumn(getField(fields, "commitId")),
      getTableDateTimeColumn(getField(fields, "pipelineEndTime")),
    ],
    []
  );

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const getBody = () => {
    return (
      <>
        {getDateRange()}
        {getBuildSummaryDetails()}
        <FilterContainer
          title={`Gitlab Pipeline Statistics Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}
          className={"px-2 pb-2"}
        />
      </>
    );
  };

  const getBuildSummaryDetails = () => {
    if (!insightsData) {
      return null;
    }
    const pipelineData = insightsData?.pipeline;
    const stepData = insightsData?.step;
    return (
      <Row className="pb-3 px-2">
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={pipelineData[activeTab]?.count}
            displayText="Total Pipelines"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.total}
            displayText="Total Stages"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.totalSuccess}
            displayText="Success Stages"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.totalFailed}
            displayText="Failed Stages"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.totalSkipped}
            displayText="Skipped Stages"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.totalCancelled}
            displayText="Cancelled Stages"
            icon={faCircleInfo}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={getTimeDisplay(pipelineData[activeTab]?.averageDuration)[0]}
            displayText="Average Pipeline Duration"
            icon={faTimer}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={getTimeDisplay(stepData[activeTab]?.maxDuration)[0]}
            displayText="Max Stage Duration"
            icon={faTimer}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={getTimeDisplay(stepData[activeTab]?.minDuration)[0]}
            displayText="Min Stage Duration"
            icon={faTimer}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.maxDurationStep}
            displayText="Most Time Consuming Stage"
            icon={faLightbulbOn}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.maxStepFailed}
            displayText="Most Failed Stage"
            icon={faLightbulbOn}
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <GitlabPipelineInsightsDataBlock
            displayValue={stepData[activeTab]?.maxStepSkipped}
            displayText="Most Skipped Stage"
            icon={faLightbulbOn}
          />
        </Col>
      </Row>
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={insightsData?.pipeline[activeTab].pipelines}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
      />
    );
  };

  return <>{getBody()}</>;
}

GitlabPipelineStatisticsActionableInsightsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  insightsData: PropTypes.object,
  activeTab: PropTypes.string,
};

GitlabPipelineStatisticsActionableInsightsTable.defaultProps = {
    activeTab: "success",
};
export default GitlabPipelineStatisticsActionableInsightsTable;
