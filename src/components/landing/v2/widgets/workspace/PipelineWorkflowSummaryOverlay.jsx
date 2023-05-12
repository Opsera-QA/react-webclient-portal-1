import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import {errorHelpers} from "components/common/helpers/error-helpers";
import useGetPollingPipelineModelById from "hooks/workflow/pipelines/useGetPollingPipelineModelById";
import OverlayContainer from "components/common/overlays/OverlayContainer";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import useGetPipelineDurationMetrics from "hooks/workflow/pipelines/metrics/useGetPipelineDurationMetrics";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";
import PipelineOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/PipelineOrchestrationProgressBarBase";
import ViewPipelineButton from "temp-library-components/button/pipeline/ViewPipelineButton";
import {VanityFocusTextBase} from "temp-library-components/label/VanityFocusTextBase";
import ViewPipelineLogsButton from "temp-library-components/button/pipeline/ViewPipelineLogsButton";
import {PlacementHelperDiv} from "@opsera/react-vanity-set";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineFooter from "components/landing/v2/widgets/workspace/PipelineFooter";
import {getLargeVendorIconComponentFromPipeline} from "components/common/helpers/icon-helpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

// TODO: Should this be two separate panels?
export default function PipelineWorkflowSummaryOverlay({ pipelineId }) {
  const {
    pipelineModel,
    error,
    isLoading,
  } = useGetPollingPipelineModelById(pipelineId);
  const {
    lastRunDurationText,
    totalAverageDurationText,
    isLoading: isLoadingMetrics,
  } = useGetPipelineDurationMetrics(pipelineId, pipelineModel?.getRunCount());
  const {
    toastContext,
  } = useComponentStateReference();
  const icon = getLargeVendorIconComponentFromPipeline(pipelineModel?.getCurrentData(), .75);

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
          className={"mx-3"}
        >
          <WidgetDataBlockBase className={"mb-2"}>
            <div className={"p-2 w-100"}>
              <CenteredContentWrapper>
                <VanityFocusTextBase
                  text={lastRunDurationText}
                />
              </CenteredContentWrapper>
              <CenteredContentWrapper>
                <VanityLabelBase
                  label={"Last Run Duration"}
                />
              </CenteredContentWrapper>
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
          className={"mx-3"}
        >
          <WidgetDataBlockBase className={"mb-2"}>
            <div className={"p-2 w-100"}>
              <CenteredContentWrapper>
                <VanityFocusTextBase
                  text={totalAverageDurationText}
                />
              </CenteredContentWrapper>
              <CenteredContentWrapper className={"mx-auto"}>
                <VanityLabelBase
                  label={"Average Run Duration"}
                />
              </CenteredContentWrapper>
            </div>
          </WidgetDataBlockBase>
        </div>
      );
    }
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
              <div className={"d-flex px-3 pt-3"}>
                <div className={"standard-border-radius mr-3"}>
                  {icon}
                </div>
                <div className={"font-larger my-auto"}>
                  {orchestrationHelper.getLastRunSummaryForPipelineModel(pipelineModel)}
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className={"py-3 px-4"}>
                <TextFieldBase
                  dataObject={pipelineModel}
                  fieldName={"description"}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className={"d-flex w-100 justify-content-between my-3"}>
                {getLastRunDuration()}
                {getTotalRunAverageDuration()}
              </div>
            </Col>
            <Col xs={12}>
              <div className={"d-flex justify-content-between w-100 my-3"}>
                <PlacementHelperDiv
                  width={"150px"}
                />
                {/*<PipelineActionControls*/}
                {/*  pipeline={pipelineModel?.getCurrentData()}*/}
                {/*  isLoading={isLoading}*/}
                {/*  workflowStatus={status}*/}
                {/*  runCount={runCount}*/}
                {/*  isQueued={isQueued}*/}
                {/*  fetchData={loadData}*/}
                {/*/>*/}
                {/*
                <PlacementHelperDiv
                  width={"190px"}
                />*/}
                <ViewPipelineButton
                  pipelineId={pipelineId}
                />
                <PlacementHelperDiv
                  width={"150px"}
                />

                <PlacementHelperDiv
                  width={"150px"}
                >
                  <ViewPipelineLogsButton
                    pipelineId={pipelineId}
                  />
                </PlacementHelperDiv>
                <PlacementHelperDiv
                  width={"150px"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const getTitleText = () => {
    if (pipelineModel) {
      const name = pipelineModel?.getData("name");
      const runCount = pipelineModel?.getRunCount();

      if (runCount === 0) {
        return `${name}: No Runs`;
      }

      return `${pipelineModel?.getData("name")}: Run ${pipelineModel?.getRunCount()}`;
    }

    return "";
  };

  return (
    <OverlayContainer
      closePanel={closePanel}
      titleText={getTitleText()}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
      isLoading={isLoading && pipelineModel == null}
      softLoading={isLoading}
      minimumWidth={"800px"}
      maximumWidth={"800px"}
      footer={<PipelineFooter pipelineModel={pipelineModel} />}
    >
      <div>
        {getBody()}
        <PipelineOrchestrationProgressBarBase
          pipelineModel={pipelineModel}
          className={"mt-2 flat-progress-bar"}
        />
      </div>
    </OverlayContainer>
  );
}

PipelineWorkflowSummaryOverlay.propTypes = {
  pipelineId: PropTypes.string,
};
