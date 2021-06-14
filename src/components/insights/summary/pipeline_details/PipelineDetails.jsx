import React, { useState } from "react";
import PropTypes from "prop-types";
import TotalPipelinesExecuted from "components/insights/summary/pipeline_details/charts/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/pipeline_details/charts/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/charts/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/charts/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/charts/PipelinesFailedDeployment";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";
import PipelinesByProjectTable from "components/insights/summary/PipelinesByProjectTable";
import PipelinesByProjectDataBlock
  from "components/insights/summary/pipeline_details/charts/PipelinesByProjectDataBlock";

function PipelineDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("pipelines_by_project");
  const [selectedDataBlockTableData, setSelectedDataBlockTableData] = useState([]);

  const getDynamicPanel = () => {
    switch (selectedDataBlock) {
      case "pipelines_by_project":
        return (
          <PipelinesByProjectTable
            dashboardData={selectedDataBlockTableData}
          />
        );
      case "total_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Executed"
          />
        );
      case "successful_pipelines":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Security and Quality)"
          />
        );
      case "security_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Security Step"
          />
        );
      case "quality_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Quality Step"
          />
        );
      case "deployment_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Deployment Step"
          />
        );
      default:
        return null;
    }
  };

  const toggleDynamicPanel = (name, dataSet) => {
    if (selectedDataBlock === name) {
      setSelectedDataBlock("");
      setSelectedDataBlockTableData([]);
    }
    else {
      setSelectedDataBlock(name);
      setSelectedDataBlockTableData(dataSet);
    }
  };

  return (
    <>
      <DataBlockWrapper padding={4}>
        <PipelinesByProjectDataBlock
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
        <TotalPipelinesExecuted
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
        <PipelinesPassedWithQualityAndSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
        <PipelinesFailedSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
        <PipelinesFailedQuality
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
        <PipelinesFailedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
        />
      </DataBlockWrapper>
      {getDynamicPanel()}
    </>
  );
}

PipelineDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default PipelineDetails;
