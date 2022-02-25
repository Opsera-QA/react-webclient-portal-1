import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SalesforceLogSummaryComponentOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryComponentOverview";
import SalesforceLogSummaryUnitTestOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryUnitTestOverview";
import SalesforceLogSummaryExecutionOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryExecutionOverview";
import SalesforceLogSummaryCodeCoverageOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryCodeCoverageOverview";

function SalesforceLogSummaryOverviewSummaryPanel({ salesforceDeployResultsModel }) {
  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Summary Overview"}
        size={'sm'}
      />
    );
  }

  return (
    <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
      <SalesforceLogSummaryExecutionOverview
        salesforceDeployResultsModel={salesforceDeployResultsModel}
      />
      <SalesforceLogSummaryComponentOverview
        salesforceDeployResultsModel={salesforceDeployResultsModel}
      />
      <SalesforceLogSummaryUnitTestOverview
        salesforceDeployResultsModel={salesforceDeployResultsModel}
      />
      <SalesforceLogSummaryCodeCoverageOverview
        salesforceDeployResultsModel={salesforceDeployResultsModel}
      />
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryOverviewSummaryPanel.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryOverviewSummaryPanel;