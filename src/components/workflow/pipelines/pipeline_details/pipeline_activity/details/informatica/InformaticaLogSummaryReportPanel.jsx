import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import InformaticaLogSummaryTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/components/InformaticaLogSummaryTable";
import InformaticaReportSummaryOverview
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/components/InformaticaReportSummaryOverview";
import informaticaSummaryLogResultMetaData
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/metadata/informaticaSummaryLogResult.metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import InformaticaSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";

function InformaticaLogSummaryReportPanel({ pipelineTaskData }) {
  const [informaticaResultsModel, setInformaticaResultsModel] = useState(undefined);
  const [informaticaDeployObjs, setInformaticaDeployObjs] = useState(undefined);
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
      const jobDetails = pipelineTaskData?.api_response?.informaticaJobStatus;
      const deployObj = Object.keys(jobDetails)?.length > 0 ? jobDetails.objects : undefined;
      setInformaticaDeployObjs(deployObj);
      if (jobDetails != null) {
        setInformaticaResultsModel(new Model(jobDetails, informaticaSummaryLogResultMetaData, false));
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
          <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
            <InformaticaReportSummaryOverview
              informaticaResultsModel={informaticaResultsModel}
            />
            <InformaticaLogSummaryTable
              informaticaDeployObjs={informaticaDeployObjs}
            />
          </SummaryPanelContainer>
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };

  if (pipelineTaskData == null || isLoading) {
    return (
      <LoadingDialog
        message={"Loading Pipeline"}
        size={'sm'}
      />
    );
  }

  if (informaticaResultsModel == null) {
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
      title={`Informatica Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<InformaticaSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


InformaticaLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default InformaticaLogSummaryReportPanel;