import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import BoomiReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/components/BoomiReportSummaryOverview";
import boomiSummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/metadata/boomiSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import BoomiSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/BoomiSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import BoomiReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/boomi/components/BoomiReportView";

function BoomiLogSummaryReportPanel({ pipelineTaskData }) {
  const [boomiReportModel, setBoomiReportModel] = useState(undefined);
  const [boomiObj, setBoomiObj] = useState(undefined);
  const [errorObj, setErrorObj] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
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
      const jobDetails = pipelineTaskData?.api_response?.summaryResult;
      const job_type = pipelineTaskData?.api_response?.jobType;
      const summaryStats = pipelineTaskData?.api_response?.summaryResult?.stats;
      const successfulPackages = Object.keys(jobDetails)?.length > 0 ? jobDetails.result : undefined;
      const errorPackages = Object.keys(jobDetails)?.length > 0 ? jobDetails?.errorResult : undefined;
      setBoomiObj(successfulPackages);
      setErrorObj(errorPackages);
      if (summaryStats != null && job_type) {
        setBoomiReportModel(new Model(summaryStats, boomiSummaryLogResultMetaData, false));
        setJobType(job_type);
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
            <BoomiReportSummaryOverview
              boomiResultsModel={boomiReportModel}
              jobType={jobType}
            />
            <BoomiReportView
              boomiObj={boomiObj}
              errorObj={errorObj}
              jobType={jobType}
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

  if (boomiReportModel === null && boomiObj === null) {
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
      title={`Boomi Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<BoomiSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


BoomiLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default BoomiLogSummaryReportPanel;