import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import sapCpqSummaryLogResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sap_cpq/metadata/sapCpqSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import SapCpqReportView from "./components/SapCpqReportView";
import SapCpqSummaryLogVerticalTabContainer from "./SapCpqSummaryLogVerticalTabContainer";
import SapCpqReportSummaryOverview from "./components/SapCpqReportSummaryOverview";

function SapCpqLogSummaryReportPanel({ pipelineTaskData }) {
  const [sapCpqResultsModel, setSapCpqResultsModel] = useState(undefined);
  const [sapCpqReportObjs, setSapCpqReportObjs] = useState(undefined);
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
      const jobDetails = pipelineTaskData?.api_response;
      const reportObj = Object.keys(jobDetails)?.length > 0 ? jobDetails?.summaryReport?.report : undefined;
      setSapCpqReportObjs(reportObj);
      if (jobDetails != null) {
        setSapCpqResultsModel(new Model(jobDetails, sapCpqSummaryLogResultMetadata, false));
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
            <SapCpqReportSummaryOverview
                sapCpqResultsModel={sapCpqResultsModel}
            />
            <SapCpqReportView
                sapCpqReportObjs={sapCpqReportObjs}
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

  if (sapCpqResultsModel == null) {
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
      title={`SAP CPQ Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<SapCpqSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


SapCpqLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default SapCpqLogSummaryReportPanel;