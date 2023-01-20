import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import FortifyReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/components/FortifyReportSummaryOverview";
import fortifySummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/metadata/fortifySummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import FortifySummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/FortifySummaryLogVerticalTabContainer";
import { faClipboardListCheck, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import FortifyReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/fortify/components/FortifyReportView";

function FortifyLogSummaryReportPanel({ pipelineTaskData }) {
  const [fortifyReportModel, setFortifyReportModel] = useState(undefined);
  const [fortifyObj, setFortifyObj] = useState(undefined);
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
      setFortifyObj(deployObj);
      if (jobDetails != null) {
        setFortifyReportModel(new Model(jobDetails, fortifySummaryLogResultMetaData, false));
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
            <FortifyReportSummaryOverview
              fortifyResultsModel={fortifyReportModel}
            />
            <FortifyReportView
              fortifyObj={fortifyObj}
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

  if (fortifyReportModel == null) {
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
      title={`Fortify Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<FortifySummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


FortifyLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default FortifyLogSummaryReportPanel;
