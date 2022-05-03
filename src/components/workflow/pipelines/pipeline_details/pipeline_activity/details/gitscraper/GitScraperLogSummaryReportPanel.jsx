import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import GitScraperReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/components/GitScraperReportSummaryOverview";
import gitScraperSummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/metadata/gitScraperSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import GitScraperSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/GitScraperSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import GitScraperReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/gitscraper/components/GitScraperReportView";

function GitScraperLogSummaryReportPanel({ pipelineTaskData }) {
  const [gitScraperReportModel, setGitScraperReportModel] = useState(undefined);
  const [gitScraperObj, setGitScraperObj] = useState(undefined);
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
      setGitScraperObj(deployObj);
      if (jobDetails != null) {
        setGitScraperReportModel(new Model(jobDetails, gitScraperSummaryLogResultMetaData, false));
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
          <SummaryPanelContainer className={"mx-3 mt-3"}>
            <GitScraperReportSummaryOverview
              gitScraperResultsModel={gitScraperReportModel}
            />
            <GitScraperReportView
              gitScraperObj={gitScraperObj}
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

  if (gitScraperReportModel == null) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There was no proper summary log captured with this execution.
      </div>
    );
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faClipboardListCheck}
      title={`Git Scraper Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<GitScraperSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


GitScraperLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default GitScraperLogSummaryReportPanel;