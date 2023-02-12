import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import BlackduckSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/BlackduckSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import BlackduckReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/blackduck/components/BlackduckReportView";

function BlackduckLogSummaryReportPanel({ pipelineTaskData }) {
  const [blackduckObj, setBlackduckObj] = useState(undefined);
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
      const jobDetails = pipelineTaskData?.api_response?.summaryReport;

      // const vulnerabilityReport = Object.keys(jobDetails)?.length > 0 && jobDetails?.report?.VULNERABILITY ? jobDetails?.report?.VULNERABILITY : [];
      // setSonarQualityGateReport(sonarQualityGateReportDetails);
      // const opseraThresholdValidationDetails = Object.keys(jobDetails)?.length > 0 && jobDetails?.report?.opsera_threshold_validation?.conditions ? jobDetails?.report?.opsera_threshold_validation?.conditions : [];
      // setOpseraThresholdValidationReport(opseraThresholdValidationDetails);

      const deployObj = Object.keys(jobDetails)?.length > 0 ? jobDetails.report : undefined;
      setBlackduckObj(deployObj);      
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
          <SummaryPanelContainer className={"mx-3 mt-3"}>            
            <BlackduckReportView
              blackduckObj={blackduckObj}
            />
          </SummaryPanelContainer>
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };

  if (pipelineTaskData == null || isLoading) {
    return (
      <LoadingDialog
        message={"Loading Report"}
        size={'sm'}
      />
    );
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faClipboardListCheck}
      title={`Blackduck Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<BlackduckSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


BlackduckLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default BlackduckLogSummaryReportPanel;
