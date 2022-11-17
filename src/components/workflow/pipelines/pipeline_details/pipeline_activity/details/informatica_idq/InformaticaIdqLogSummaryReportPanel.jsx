import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import InformaticaSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica/InformaticaSummaryLogVerticalTabContainer";
import { faClipboardListCheck, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import InformaticaIdqReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/informatica_idq/components/InformaticaIdqReportView";

function InformaticaIdqLogSummaryReportPanel({ pipelineTaskData }) {
  const [informaticaResultsModel, setInformaticaResultsModel] = useState(undefined);
  const [informaticaDeployObjs, setInformaticaDeployObjs] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isImportObj, setIsImport] = useState(false);
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
      if(Array.isArray(deployObj) && deployObj[0]?.sourcePath) {
        setIsImport(true);
      }
      setInformaticaDeployObjs(deployObj);
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
            <InformaticaIdqReportView
              informaticaDeployObjs={informaticaDeployObjs}
              isImportObj={isImportObj}
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

  if (informaticaDeployObjs == null) {
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
      title={`Informatica IDQ Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={<InformaticaSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


InformaticaIdqLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default InformaticaIdqLogSummaryReportPanel;