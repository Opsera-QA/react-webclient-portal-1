import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TotalPipelinesExecuted from "components/insights/summary/pipeline_details/charts/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/pipeline_details/charts/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/pipeline_details/charts/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/pipeline_details/charts/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/pipeline_details/charts/PipelinesFailedDeployment";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import InsightsPipelineDetailsTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsTable";
import InsightsPipelineDetailsDurationTable from "components/insights/summary/pipeline_details/InsightsPipelineDetailsDurationTable";
import PipelinesByProjectTable from "components/insights/summary/PipelinesByProjectTable";
import TotalPipelinesPassedDeployment from 'components/insights/summary/pipeline_details/charts/TotalPipelinesPassedDeployment';
import MetricContainer from "components/common/panels/insights/charts/MetricContainer";
import JiraLeadTimeChartNoDataBlocks from "components/insights/charts/jira/line_chart/lead_time/JiraLeadTimeChartNoDataBlocks"; 
import JiraLeadTimeDataBlock from "./JiraLeadTimeDataBlock";
import AvgDeploymentDuration from "components/insights/summary/pipeline_details/AvgDeploymentDuration";
import AvgBuildDuration from "components/insights/summary/pipeline_details/AvgBuildDuration";
import AvgApprovalTimeDataBlock from "components/insights/summary/pipeline_details/AvgApprovalTime";

function PipelineDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [selectedDataBlockTableData, setSelectedDataBlockTableData] = useState([]);

  useEffect(()=>{
    setSelectedDataBlock("");
    setSelectedDataBlockTableData([]);
  },[dashboardData]);

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
            tableTitle="Total Number of Pipelines Executed"
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
            tableTitle="Failed Pipelines (Security)"
          />
        );
      case "quality_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Failed Pipelines (Quality)"
          />
        );
      case "deployment_failed":
        return (
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Failed Pipelines (Deployments)"
          />
        );
      case "successful_pipelines_deployment":
        return(
          <InsightsPipelineDetailsTable
            data={selectedDataBlockTableData}
            tableTitle="Successful Pipelines (Deployments)"
          />
        );
      case "jiraLeadTime":
        return (
          <JiraLeadTimeChartNoDataBlocks dashboardData={dashboardData} kpiConfiguration={{kpi_name: "Lead Time", filters: []}}/>
        );
      case "Average_Deployment_Duration":
        return (
          <InsightsPipelineDetailsDurationTable
            data={selectedDataBlockTableData}
            tableTitle="Average Deployment Duration (Mins)"
          />
        );
      case "Average_Build_Duration":{
        return (
          <InsightsPipelineDetailsDurationTable
            data={selectedDataBlockTableData}
            tableTitle="Average Build Duration (Mins)"
          />
        );
      }
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
  // const getValueStream = () => {
  //   return (
  //     <DataBlockWrapper padding={0}>
  //       <JiraLeadTimeDataBlock 
  //         dashboardData={dashboardData}
  //         toggleDynamicPanel={toggleDynamicPanel}
  //         selectedDataBlock={selectedDataBlock}
  //         style={{maxWidth:"33%"}}
  //       />
  //     </DataBlockWrapper>
  //   );
  // };
  const getAverageBlocks = ()=>{
    return (
      <DataBlockWrapper padding={0}>
        <AvgDeploymentDuration 
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <AvgBuildDuration 
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{maxWidth:"33%"}}
        />
        <AvgApprovalTimeDataBlock
          dashboardData={dashboardData}
          toggleDynamicPanel={toggleDynamicPanel}
          selectedDataBlock={selectedDataBlock}
          style={{ maxWidth: "33%" }}
          disable={true}
        />
      </DataBlockWrapper>
    );
  };

  return (
    <>
      <div className={"d-flex flex-wrap justify-content-around w-100"} >
        <MetricContainer title="Pipelines: Success Score">
          {getPipelinesSuccess()}
        </MetricContainer>
        <MetricContainer title="Pipelines: Failure Score">
          {getPipelinesFailure()}
        </MetricContainer>
        {/* <MetricContainer title="Value Stream">
          {getValueStream()}
        </MetricContainer> */}
        <MetricContainer title="Pipeline: Duration Average">
          {getAverageBlocks()}
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
