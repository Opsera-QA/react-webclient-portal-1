import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SnykReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/components/SnykReportView";
import SnykSummaryVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/SnykSummaryVerticalTabContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function SnykSummaryReportPanel({ pipelineTaskData }) {
  const [openSourceReport, setOpenSourceReport] = useState(undefined);
  const [sastScanReport, setSastScanReport] = useState(undefined);
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
      const jobDetails = DataParsingHelper.safeObjectPropertyParser(pipelineTaskData, "api_response.summaryReport");
      const openSourceScanReportObj = DataParsingHelper.safeObjectPropertyParser(jobDetails, "Open_Source_Scan.report");
      const sastScanReportObj = DataParsingHelper.safeObjectPropertyParser(jobDetails, "SAST_Scan.report");
      setOpenSourceReport(openSourceScanReportObj);
      setSastScanReport(sastScanReportObj);
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
            <SnykReportView
                openSourceReport={openSourceReport}
                sastScanReport={sastScanReport}
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
      title={`Snyk Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<SnykSummaryVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


SnykSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default SnykSummaryReportPanel;
