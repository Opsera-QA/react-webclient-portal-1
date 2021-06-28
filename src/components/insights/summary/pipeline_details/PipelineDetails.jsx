import React, { useState } from "react";
import PropTypes from "prop-types";
import TotalPipelinesExecuted from "components/insights/summary/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/pipeline_details/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/PipelinesFailedDeployment";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";
import PipelinesByProjectTable from "components/insights/summary/PipelinesByProjectTable";
import PipelinesByProjectDataBlock from "components/insights/summary/pipeline_details/PipelinesByProjectDataBlock";
import TotalPipelinesPassedDeployment from 'components/insights/summary/pipeline_details/TotalPipelinesPassedDeployment';
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import "components/insights/summary/pipeline_details/customDatablock.css";

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
      case "successful_pipelines_deployment":
        return(
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Deployments)"
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

  const getPipelinesSuccess = () => {
    return (
      <DataBlockWrapper padding={0}>
        <TotalPipelinesExecuted
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <PipelinesPassedWithQualityAndSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <TotalPipelinesPassedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
      </DataBlockWrapper> 
    );
  };

  const getPipelinesFailure = () => {
    return (
      
      <DataBlockWrapper padding={0}> 
        <PipelinesFailedQuality
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <PipelinesFailedSecurity
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <PipelinesFailedDeployment
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
      </DataBlockWrapper>
    );
  };

  return (
    <>
      <div style={{display:"flex", justifyContent: "space-around", flexWrap:"wrap", width:"100%"}}>
        <MetricContainer addedClass="metricContainer"  title="Pipelines: Success Score">
          {getPipelinesSuccess()}
        </MetricContainer>
        <MetricContainer addedClass="metricContainer"  title="Pipelines: Failure Score">
          {getPipelinesFailure()}
        </MetricContainer>
      </div>

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
