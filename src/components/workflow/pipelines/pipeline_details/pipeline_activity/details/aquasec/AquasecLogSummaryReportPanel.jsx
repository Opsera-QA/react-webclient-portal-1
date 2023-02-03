import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import AquasecSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/AquasecSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import AquasecReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/components/AquasecReportView";
import AquasecReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/components/AquasecReportSummaryOverview";

function AquasecLogSummaryReportPanel({ pipelineTaskData }) {
  const [aquasecSummaryObject, setAquasecSummaryObject] = useState(undefined);
  const [aquasecObj, setAquasecObj] = useState(undefined);
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
      const deployObj = Object.keys(jobDetails)?.length > 0 ? jobDetails.report : undefined;
      const summaryObj = Object.keys(jobDetails)?.length > 0 ? jobDetails.summary : undefined;
      setAquasecObj(deployObj);
      setAquasecSummaryObject(summaryObj);
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
            <AquasecReportSummaryOverview
              aquasecSummaryObject={aquasecSummaryObject}
              isLoading={isLoading}
            />
            <AquasecReportView
              aquasecObj={aquasecObj}
              isLoading={isLoading}
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
      title={`Aquasec Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<AquasecSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


AquasecLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default AquasecLogSummaryReportPanel;
