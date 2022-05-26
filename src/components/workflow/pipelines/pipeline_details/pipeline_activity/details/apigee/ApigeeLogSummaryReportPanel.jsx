import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ApigeeReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/components/ApigeeReportSummaryOverview";
import apigeeSummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/metadata/apigeeSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import ApigeeSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/ApigeeSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import ApigeeReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/apigee/components/ApigeeReportView";

function ApigeeLogSummaryReportPanel({ pipelineTaskData }) {
  const [apigeeReportModel, setApigeeReportModel] = useState(undefined);
  const [apigeeObj, setApigeeObj] = useState(undefined);
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
      setApigeeObj(deployObj);
      if (jobDetails != null) {
        setApigeeReportModel(new Model(jobDetails, apigeeSummaryLogResultMetaData, false));
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
            <ApigeeReportSummaryOverview
              apigeeResultsModel={apigeeReportModel}
            />
            <ApigeeReportView
              apigeeObj={apigeeObj}
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

  if (apigeeReportModel == null) {
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
      title={`Apigee Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<ApigeeSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


ApigeeLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default ApigeeLogSummaryReportPanel;