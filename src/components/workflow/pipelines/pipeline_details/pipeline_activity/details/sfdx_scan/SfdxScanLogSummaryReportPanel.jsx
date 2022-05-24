import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import SfdxScanSummaryLogVerticalTabContainer from "./SfdxScanSummaryLogVerticalTabContainer";
import SfdxScanReportSummaryOverview from "./components/SfdxScanReportSummaryOverview";
import sfdxScanSummaryLogResultMetadata from "./metadata/SfdxScanSummaryLogResult.metadata";
import SfdxScanExecLogSummaryTable from "./components/SfdxScanExecLogSummaryTable";

function SfdxScanLogSummaryReportPanel({ pipelineTaskData }) {
  const [statusSummaryModel, setStatusSummaryModel] = useState(undefined);
  const [sfdxScanSummary, setSfdxScanSummary] = useState(undefined);
  const [sfdxScanExecDetails, setSfdxScanExecDetails] = useState(undefined);
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
      const result = pipelineTaskData?.api_response?.scanResult;
      const report = JSON.parse(result);
      setStatusSummaryModel(new Model(report, sfdxScanSummaryLogResultMetadata, false));
      setSfdxScanSummary(Object.keys(report)?.length > 0 ? report.summary : undefined);
      setSfdxScanExecDetails(Object.keys(report)?.length > 0 ? report.execDetails : undefined);
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
            <SfdxScanReportSummaryOverview
                statusSummaryModel={statusSummaryModel}
              sfdxScanResults={sfdxScanSummary}
            />
          </SummaryPanelContainer>
        </VanitySetTabView>
        <VanitySetTabView tabKey={"execDetails"}>
          <SfdxScanExecLogSummaryTable
              execLogResults={sfdxScanExecDetails}
          />
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

  if (sfdxScanSummary == null) {
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
      verticalTabContainer={<SfdxScanSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


SfdxScanLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default SfdxScanLogSummaryReportPanel;