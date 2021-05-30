import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
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
      case "Successful Pipelines (Security and Quality)":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Security and Quality)"
          />
        );
      case "Pipelines Failing Security Step":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Security Step"
          />
        );
      case "Pipelines Failing Quality Step":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Pipelines Failing Quality Step"
          />
        );
      case "Pipelines Failing Deployment Step":
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
    if(name === selectedDataBlock || dataSet.length === 0){
      setSelectedDataBlock('');
      setSelectedDataBlockTableData([]);
    }
    else{
      setSelectedDataBlock(name);
      setSelectedDataBlockTableData(dataSet);
    }
  };

  return (
    <>
      <DataBlockWrapper padding={4}>
        <TotalPipelinesExecuted
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesPassedWithQualityAndSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesFailedSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesFailedQuality
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesFailedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
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
