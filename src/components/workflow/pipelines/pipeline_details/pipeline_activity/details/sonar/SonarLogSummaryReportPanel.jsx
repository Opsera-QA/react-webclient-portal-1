import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import SonarSummaryLogVerticalTabContainer
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/SonarSummaryLogVerticalTabContainer";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import SonarReportView
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/sonar/components/SonarReportView";
import {Col, Row} from "react-bootstrap";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

function SonarLogSummaryReportPanel({ pipelineTaskData }) {  
  const [sonarQualityGateReport, setSonarQualityGateReport] = useState(undefined);
  const [opseraThresholdValidationReport, setOpseraThresholdValidationReport] = useState(undefined);
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
      const sonarQualityGateReportDetails = Object.keys(jobDetails)?.length > 0 && jobDetails?.report?.sonar_quality_gate?.conditions ? jobDetails?.report?.sonar_quality_gate?.conditions : [];
      setSonarQualityGateReport(sonarQualityGateReportDetails);
      const opseraThresholdValidationDetails = Object.keys(jobDetails)?.length > 0 && jobDetails?.report?.opsera_threshold_validation?.conditions ? jobDetails?.report?.opsera_threshold_validation?.conditions : [];
      setOpseraThresholdValidationReport(opseraThresholdValidationDetails);
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
        <VanitySetTabView tabKey={"sonar"}>
          <SummaryPanelContainer className={"mx-3 mt-3"}>
            <Row className={"my-3"}>
              <Col lg={12}><H4FieldSubHeader subheaderText={"Sonar Quality Gate Report"}/></Col>
            </Row>
            <SonarReportView
              sonarReport={sonarQualityGateReport}
            />
          </SummaryPanelContainer>
        </VanitySetTabView>
        <VanitySetTabView tabKey={"opsera"}>
          <SummaryPanelContainer className={"mx-3 mt-3"}>
            <Row className={"my-3"}>
              <Col lg={12}><H4FieldSubHeader subheaderText={"Opsera Threshold Validation Report"}/></Col>
            </Row>
            <SonarReportView
              sonarReport={opseraThresholdValidationReport}
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
      title={`Sonar Execution Summary`}
      defaultActiveKey={"sonar"}
      verticalTabContainer={<SonarSummaryLogVerticalTabContainer />}
      currentView={getTabContentContainer()}
    />
  );
}


SonarLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default SonarLogSummaryReportPanel;
