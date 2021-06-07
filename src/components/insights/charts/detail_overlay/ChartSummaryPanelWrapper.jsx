import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import BitbucketRejectedMergeRequestsSummaryPanel
  from "components/insights/charts/bitbucket/table/bitbucket-rejected-merge-requests/BitbucketRejectedMergeRequestsSummaryPanel";
import OpseraDeploymentFreqStatsSuccessSummaryPanel
  from "../opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel";
import OpseraDeploymentFreqStatsFailureSummaryPanel
  from "../opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsFailureSummaryPanel";
import SFDCPipelinesSummaryPanel from "components/insights/charts/sfdc/SFDCPipelinesOverlayPanel";
import OpseraMeanTimeToRestoreSummaryPanel from "../opsera/bar_chart/mean_time_to_restore/OpseraMeanTimeToRestoreSummaryPanel";
import PipelineByStatusSuccessfulTable from "../opsera/bar_chart/pipeline_by_status/PipelineByStatusSuccessfulTable";
import PipelineByStatusFailedTable from "../opsera/bar_chart/pipeline_by_status/PipelineByStatusFailedTable";

function ChartSummaryPanelWrapper({ chartModel, kpiIdentifier, dashboardData, kpiConfiguration, pipelineName, currentDate, setActiveTab }) {
  const getStepConfigurationSummary = () => {
    switch (kpiIdentifier) {
      case "bitbucket-rejected-merge-requests":
        return (
          <BitbucketRejectedMergeRequestsSummaryPanel
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "opsera-deployment-frequency-stats-successful":
        return (
          <OpseraDeploymentFreqStatsSuccessSummaryPanel
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "opsera-deployment-frequency-stats-failed":
        return (
          <OpseraDeploymentFreqStatsFailureSummaryPanel
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "sfdc-backups-successful":
        return (
          <SFDCPipelinesSummaryPanel
            result={"pipelinesSFDCBackupsSuccess"}
            dashboardData={dashboardData} 
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "sfdc-backups-failure":
        return (
          <SFDCPipelinesSummaryPanel
            result={"pipelinesSFDCBackupsFailure"}
            dashboardData={dashboardData} 
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "sfdc-rollbacks-successful":
          return (
            <SFDCPipelinesSummaryPanel
              result={"pipelinesSFDCRollbacksSuccess"}
              dashboardData={dashboardData} 
              kpiConfiguration={kpiConfiguration}
              chartModel={chartModel}
              setActiveTab={setActiveTab}
            />
          );
      case "sfdc-rollbacks-failure":
          return (
            <SFDCPipelinesSummaryPanel
              result={"pipelinesSFDCRollbacksFailure"}
              dashboardData={dashboardData} 
              kpiConfiguration={kpiConfiguration}
              chartModel={chartModel}
              setActiveTab={setActiveTab}
            />
          );
      case "sfdc-profile-migrations-successful":
            return (
              <SFDCPipelinesSummaryPanel
                result={"pipelinesSFDCProfileMigrationsSuccess"}
                dashboardData={dashboardData} 
                kpiConfiguration={kpiConfiguration}
                chartModel={chartModel}
                setActiveTab={setActiveTab}
                pipelineName={pipelineName}
              />
            );
      case "sfdc-profile-migrations-failure":
            return (
              <SFDCPipelinesSummaryPanel
                result={"pipelinesSFDCProfileMigrationsFailure"}
                dashboardData={dashboardData} 
                kpiConfiguration={kpiConfiguration}
                chartModel={chartModel}
                setActiveTab={setActiveTab}
                pipelineName={pipelineName}
              />
            );
      case "sfdc-unit-testing-successful":
        return (
          <SFDCPipelinesSummaryPanel
            result={"pipelinesSFDCUnitTestingSuccess"}
            dashboardData={dashboardData} 
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "sfdc-unit-testing-failure":
        return (
          <SFDCPipelinesSummaryPanel
            result={"pipelinesSFDCUnitTestingFailure"}
            dashboardData={dashboardData} 
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
          />
        );
      case "mean-time-to-restore":
        return (
          <OpseraMeanTimeToRestoreSummaryPanel
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
            currentDate={currentDate}
          />
        );
      case "status-by-pipeline-successful":
        return (
          <PipelineByStatusSuccessfulTable
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
            currentDate={currentDate}
            pipelineName={pipelineName}
          />
        );
      case "status-by-pipeline-failed":
        return (
          <PipelineByStatusFailedTable
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            chartModel={chartModel}
            setActiveTab={setActiveTab}
            currentDate={currentDate}
            pipelineName={pipelineName}
          />
        );
      default:
        return (
          <SummaryPanelContainer>
            <ReactJson src={chartModel?.getPersistData()} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
          </SummaryPanelContainer>
        );
    }
  };

  return (
    <div>
      {getStepConfigurationSummary()}
    </div>
  );
}

ChartSummaryPanelWrapper.propTypes = {
  chartModel: PropTypes.object,
  setActiveTab: PropTypes.func,
  kpiIdentifier: PropTypes.string,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  pipelineName: PropTypes.string,
  currentDate: PropTypes.string
};

export default ChartSummaryPanelWrapper;
