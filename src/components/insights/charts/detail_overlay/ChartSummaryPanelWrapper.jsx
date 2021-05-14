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

function ChartSummaryPanelWrapper({ chartModel, kpiIdentifier, setActiveTab }) {
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
  kpiIdentifier: PropTypes.string
};

export default ChartSummaryPanelWrapper;
