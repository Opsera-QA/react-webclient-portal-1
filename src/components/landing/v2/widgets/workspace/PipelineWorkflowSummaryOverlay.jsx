import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineLastRunDateField from "temp-library-components/fields/orchestration/date/PipelineLastRunDateField";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import {errorHelpers} from "components/common/helpers/error-helpers";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import useGetPollingPipelineModelById from "hooks/workflow/pipelines/useGetPollingPipelineModelById";
import OverlayContainer from "components/common/overlays/OverlayContainer";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import useGetPipelineDurationMetrics from "hooks/workflow/pipelines/metrics/useGetPipelineDurationMetrics";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";
import VanityTextField from "temp-library-components/fields/text/VanityTextField";
import VanityTextFieldBase from "temp-library-components/fields/text/VanityTextFieldBase";
import PipelineOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/PipelineOrchestrationProgressBarBase";
import ViewPipelineButton from "temp-library-components/button/pipeline/ViewPipelineButton";
import {VanityFocusTextBase} from "temp-library-components/label/VanityFocusTextBase";
import ViewPipelineLogsButton from "temp-library-components/button/pipeline/ViewPipelineLogsButton";

// TODO: Should this be two separate panels?
export default function PipelineWorkflowSummaryOverlay({ pipelineId }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const {
    pipelineModel,
    error,
    isLoading,
    status,
    isQueued,
    runCount,
  } = useGetPollingPipelineModelById(pipelineId);
  const {
    lastFiveRunsDurationText,
    lastRunDurationText,
    totalAverageDurationText,
    loadData,
    isLoading: isLoadingMetrics,
  } = useGetPipelineDurationMetrics(pipelineId, pipelineModel?.getRunCount());

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getLastRunDuration = () => {
    if (hasStringValue(lastRunDurationText) === true) {
      return (
        <div
          style={{
            minWidth: "340px",
            maxWidth: "340px",
          }}
        >
          <WidgetDataBlockBase className={"mb-2"}>
            <div className={"p-2 mr-4"}>
              <div className={"mx-auto"}>
                <VanityFocusTextBase
                  text={lastRunDurationText}
                />
              </div>
              <div className={"mx-auto"}>
                <VanityLabelBase
                  label={"Last Run Duration"}
                />
              </div>
            </div>
          </WidgetDataBlockBase>
        </div>
      );
    }
  };

  const getLastFiveRunAverageDuration = () => {
    if (hasStringValue(lastFiveRunsDurationText) === true) {
      return (
        <div
          style={{
            minWidth: "340px",
            maxWidth: "340px",
          }}
        >
          <WidgetDataBlockBase className={"mb-2"}>
            <div className={"p-2"}>
              <div className={"mx-auto"}>
                <VanityFocusTextBase
                  text={lastFiveRunsDurationText}
                />
              </div>
              <div className={"mx-auto"}>
                <VanityLabelBase
                  label={"Last 5 Runs Average Duration"}
                />
              </div>
            </div>
          </WidgetDataBlockBase>
        </div>
      );
    }
  };

  const getTotalRunAverageDuration = () => {
    if (hasStringValue(totalAverageDurationText) === true) {
      return (
        <div
          style={{
            minWidth: "340px",
            maxWidth: "340px",
          }}
        >
          <WidgetDataBlockBase className={"mb-2"}>
            <div className={"p-2"}>
              <div className={"mx-auto"}>
                <VanityFocusTextBase
                  text={totalAverageDurationText}
                />
              </div>
              <div className={"mx-auto"}>
                <VanityLabelBase
                  label={"Average Run Duration"}
                />
              </div>
            </div>
          </WidgetDataBlockBase>
        </div>
      );
    }
  };

  const getRunMetrics = () => {
    return (
      <CenteredContentWrapper>
        <WidgetDataBlockBase className={"mt-2 mx-2"}>
          <div className={"d-flex p-3"}>
            <div className={"p-2 mr-4"}>
              <div className={"mx-auto"}>
                <VanityFocusTextBase
                  text={pipelineModel?.getRunCount()}
                />
              </div>
              <div className={"mx-auto"}>
                <VanityLabelBase
                  label={"Runs"}
                />
              </div>
            </div>
            {getLastRunDuration()}
            {getTotalRunAverageDuration()}
          </div>
        </WidgetDataBlockBase>
      </CenteredContentWrapper>
    );
  };

  const getRunMetricsV2 = () => {
    return (
      <>
        {getLastRunDuration()}
        {getTotalRunAverageDuration()}
      </>
    );
  };


  const getCloseButton = () => {
    return (
      <CloseButton
        closeEditorCallback={closePanel}
        size={"sm"}
      />
    );
  };

  const getBody = () => {
    if ((isLoading === true && pipelineModel == null) || isLoadingMetrics === true) {
      return (
        <>
          <CenterLoadingIndicator
            type={"Pipeline"}
          />
          <ButtonContainerBase className={"p-2"}>
            {getCloseButton()}
          </ButtonContainerBase>
        </>
      );
    }

    if (error) {
      return (
        <CenteredContentWrapper>
          <ErrorMessageFieldBase
            message={errorHelpers.parseApiErrorForInfoText("Pipeline", error)}
          />
          <ButtonContainerBase className={"p-2"}>
            {getCloseButton()}
          </ButtonContainerBase>
        </CenteredContentWrapper>
      );
    }

    return (
      <>
        <div className={"px-2"}>
          <Row>
            <Col xs={12}>
              <CenteredContentWrapper>
                <div className={"d-flex"}>
                  <div
                    style={{
                      minWidth: "340px",
                      maxWidth: "340px",
                    }}
                  >
                    <PipelineCardBase
                      pipelineModel={pipelineModel}
                    />
                  </div>
                  <div className={"ml-2"}>
                    {getRunMetricsV2()}
                  </div>
                </div>
              </CenteredContentWrapper>
            </Col>
            <Col xs={12}>
              <div className={"p-3"}>
                <PipelineLastRunDateField
                  pipelineModel={pipelineModel}
                />
                <VanityTextField
                  model={pipelineModel}
                  fieldName={"description"}
                />
                <VanityTextFieldBase
                  label={"Last Run Summary"}
                  text={orchestrationHelper.getLastRunSummaryForPipelineModel(pipelineModel)}
                  requireValue={true}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className={"d-flex justify-content-between w-100 my-3"}>
                <div style={{minWidth: "76px"}} />
                <div>
                  {getButtons()}
                  {/*<PipelineActionControls*/}
                  {/*  pipeline={pipelineModel?.getCurrentData()}*/}
                  {/*  isLoading={isLoading}*/}
                  {/*  workflowStatus={status}*/}
                  {/*  runCount={runCount}*/}
                  {/*  isQueued={isQueued}*/}
                  {/*  fetchData={loadData}*/}
                  {/*/>*/}
                </div>
                <div style={{maxWidth: "76px"}}>
                  {getCloseButton()}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <PipelineOrchestrationProgressBarBase
          pipelineModel={pipelineModel}
        />
      </>
    );
  };

  const getButtons = () => {
    return (
      <div className={"d-flex"}>
        <ViewPipelineButton
          pipelineId={pipelineId}
          buttonText={"Advanced"}
          buttonSize={"sm"}
          className={"my-auto mr-2"}
          variant={"link"}
        />
        <ViewPipelineLogsButton
          pipelineId={pipelineId}
          buttonSize={"sm"}
          variant={"link"}
        />
      </div>
    );
  };

  return (
    <OverlayContainer
      closePanel={closePanel}
      titleText={pipelineModel?.getData("name")}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
      isLoading={isLoading && pipelineModel == null}
      softLoading={isLoading}
    >
      <div>
        {getBody()}
      </div>
    </OverlayContainer>
  );
}

PipelineWorkflowSummaryOverlay.propTypes = {
  pipelineId: PropTypes.string,
};
