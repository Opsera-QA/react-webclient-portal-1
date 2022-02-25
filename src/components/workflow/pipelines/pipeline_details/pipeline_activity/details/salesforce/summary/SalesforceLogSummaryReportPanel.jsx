import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryOverviewSummaryPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/SalesforceLogSummaryOverviewSummaryPanel";
import salesforceSummaryLogDeployResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogDeployResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import SalesforceLogSummaryTestResultsSummaryPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummaryTestResultsSummaryPanel";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import SalesforceSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/SalesforceSummaryLogVerticalTabContainer";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import SalesforceLogSummaryComponentResultsSummaryPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/components/SalesforceLogSummaryComponentResultsSummaryPanel";
import IconBase from "components/common/icons/IconBase";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";

function SalesforceLogSummaryReportPanel({ pipelineTaskData }) {
  const [salesforceDeployResultsModel, setSalesforceDeployResultsModel] = useState(undefined);
  const [successfulTests, setSuccessfulTests] = useState(undefined);
  const [unsuccessfulTests, setUnsuccessfulTests] = useState(undefined);
  const [codeCoverageWarnings, setCodeCoverageWarnings] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    initializeData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineTaskData)]);

  const initializeData = async () => {
    try {
      const jobDetails = pipelineTaskData?.api_response?.sfdcJobDetails;
      const deployResult = Array.isArray(jobDetails) && jobDetails?.length > 0 ? jobDetails[0].deployResult : undefined;

      if (deployResult != null) {
        setSalesforceDeployResultsModel(new Model(deployResult, salesforceSummaryLogDeployResultMetadata, false));
        const successfulTests = deployResult?.details?.runTestResult?.successes;
        setSuccessfulTests(Array.isArray(successfulTests) ? [...successfulTests] : []);
        const unsuccessfulTests = deployResult?.details?.runTestResult?.failures;
        setUnsuccessfulTests(Array.isArray(successfulTests) ? [...unsuccessfulTests] : []);
        const codeCoverageWarnings = deployResult?.details?.runTestResult?.codeCoverageWarnings;
        setCodeCoverageWarnings(Array.isArray(codeCoverageWarnings) ? [...codeCoverageWarnings] : []);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  // TODO: Make own component
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView tabKey={"summary"}>
          <SalesforceLogSummaryOverviewSummaryPanel
            salesforceDeployResultsModel={salesforceDeployResultsModel}
          />
        </VanitySetTabView>
        <VanitySetTabView tabKey={"components"}>
          <SalesforceLogSummaryComponentResultsSummaryPanel
            salesforceDeployResultsModel={salesforceDeployResultsModel}
            codeCoverageWarnings={codeCoverageWarnings}
          />
        </VanitySetTabView>
        <VanitySetTabView tabKey={"tests"}>
          <SalesforceLogSummaryTestResultsSummaryPanel
            salesforceDeployResultsModel={salesforceDeployResultsModel}
            successfulTests={successfulTests}
            unsuccessfulTests={unsuccessfulTests}
            codeCoverageWarnings={codeCoverageWarnings}
          />
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };

  if (pipelineTaskData == null || isLoading) {
    return (
      <LoadingDialog
        message={"Loading Pipeline"}
        size={'sm'}
      />
    );
  }

  if (salesforceDeployResultsModel == null) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There was no proper summary log captured with this execution.
      </div>
    );
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faSalesforce}
      title={`Salesforce Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<SalesforceSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


SalesforceLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default SalesforceLogSummaryReportPanel;