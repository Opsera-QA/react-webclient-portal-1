import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import CoverityReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/components/CoverityReportView";
import CoveritySummaryVerticalTabContainer 
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/coverity/CoveritySummaryVerticalTabContainer";

function CoveritySummaryReportPanel({ pipelineTaskData }) {
  const [coverityObj, setCoverityObj] = useState(undefined);
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
      const coverityDetails = Object.keys(jobDetails)?.length > 0 ? jobDetails.reports : undefined;
      setCoverityObj(coverityDetails);      
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
            <CoverityReportView
              coverityObj={coverityObj}
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
      title={`Coverity Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<CoveritySummaryVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


CoveritySummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default CoveritySummaryReportPanel;
