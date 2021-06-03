import React, { useState } from "react";
import PropTypes from "prop-types";
import TotalPipelinesExecuted from "components/insights/summary/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/pipeline_details/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/PipelinesFailedDeployment";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";

function PipelineDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [selectedDataBlockTableData, setSelectedDataBlockTableData] = useState(
    []
  );

  const getDynamicPanel = () => {
    switch (selectedDataBlock) {
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
    setSelectedDataBlock(name);
    setSelectedDataBlockTableData(dataSet);
  };

  return (
    <>
      <DataBlockWrapper padding={4}>
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
