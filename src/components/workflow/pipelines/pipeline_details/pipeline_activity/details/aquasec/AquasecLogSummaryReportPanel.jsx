import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import aquasecSummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/metadata/aquasecSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import AquasecSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/AquasecSummaryLogVerticalTabContainer";
import { faClipboardListCheck, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import AquasecReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/aquasec/components/AquasecReportView";

function AquasecLogSummaryReportPanel({ pipelineTaskData }) {
  const [aquasecReportModel, setAquasecReportModel] = useState(undefined);
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
      setAquasecObj(deployObj);
      if (jobDetails != null) {
        setAquasecReportModel(new Model(jobDetails, aquasecSummaryLogResultMetaData, false));
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
            <AquasecReportView
              aquasecObj={aquasecObj}
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

  if (aquasecReportModel == null) {
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
