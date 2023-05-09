import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import PipelineLastRunDateField from "temp-library-components/fields/orchestration/date/PipelineLastRunDateField";
import PipelineOrchestrationSummaryField
  from "temp-library-components/fields/orchestration/pipeline/PipelineOrchestrationSummaryField";
import PipelineDurationMetricsStandaloneField
  from "components/common/fields/pipelines/metrics/PipelineDurationMetricsStandaloneField";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import {errorHelpers} from "components/common/helpers/error-helpers";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";
import useGetPollingPipelineModelById from "hooks/workflow/pipelines/useGetPollingPipelineModelById";
import OverlayContainer from "components/common/overlays/OverlayContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import useGetPipelineDurationMetrics from "hooks/workflow/pipelines/metrics/useGetPipelineDurationMetrics";
import {hasStringValue} from "components/common/helpers/string-helpers";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";

// TODO: Should this be two separate panels?
export default function PipelineWorkflowSummaryOverlay({ pipelineId }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const {
    pipelineModel,
    error,
    isLoading,
  } = useGetPollingPipelineModelById(pipelineId);
  const {
    lastFiveRunsDurationText,
    lastRunDurationText,
    totalAverageDurationText,
    loadData,
  } = useGetPipelineDurationMetrics(pipelineId, pipelineModel?.getRunCount());

  const handleViewDetailsButton = () => {
    history.push(pipelineModel?.getDetailViewLink());
    closePanel();
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getLastRunDuration = () => {
    if (hasStringValue(lastRunDurationText) === true) {
      return (
        <Col xs={3}>
          <WidgetDataBlockBase className={"mt-2"}>
            <TwoLineDataBlockBase
              title={lastRunDurationText}
              subtitle={"Last Run Duration"}
              className={"p-2"}
            />
          </WidgetDataBlockBase>
        </Col>
      );
    }
  };

  const getLastFiveRunAverageDuration = () => {
    if (hasStringValue(lastFiveRunsDurationText) === true) {
      return (
        <Col xs={3}>
          <WidgetDataBlockBase className={"mt-2"}>
            <TwoLineDataBlockBase
              title={lastFiveRunsDurationText}
              subtitle={"Last 5 Runs Average Duration"}
              className={"p-2"}
            />
          </WidgetDataBlockBase>
        </Col>
      );
    }
  };

  const getTotalRunAverageDuration = () => {
    if (hasStringValue(totalAverageDurationText) === true) {
      return (
        <Col xs={3}>
          <WidgetDataBlockBase className={"mt-2"}>
            <TwoLineDataBlockBase
              title={totalAverageDurationText}
              subtitle={"Average Run Duration"}
              className={"p-2"}
            />
          </WidgetDataBlockBase>
        </Col>
      );
    }
  };

  const getBody = () => {
    if (isLoading === true && pipelineModel == null) {
      return (
        <CenterLoadingIndicator
          type={"Pipeline"}
        />
      );
    }

    if (error) {
      return (
        <CenteredContentWrapper>
          <ErrorMessageFieldBase
            message={errorHelpers.parseApiErrorForInfoText("Pipeline", error)}
          />
        </CenteredContentWrapper>
      );
    }

    return (
      <Row>
        <Col xs={12}>
          <PipelineCardBase
            pipelineModel={pipelineModel}
          />
        </Col>
        <Col xs={3}>
          <WidgetDataBlockBase className={"mt-2"}>
            <TwoLineScoreDataBlock
              score={pipelineModel?.getRunCount()}
              subtitle={"Runs"}
              className={"p-2"}
            />
          </WidgetDataBlockBase>
        </Col>
        {getLastRunDuration()}
        {getTotalRunAverageDuration()}
        <Col xs={6}>
          <PipelineLastRunDateField
            pipelineModel={pipelineModel}
          />
        </Col>
        <Col xs={12}>
          <WidgetDataBlockBase className={"mt-2"}>
            <div className={"p-3"}>
              <VanityLabelBase label={pipelineModel?.getLabel("description")} />
              <div>{pipelineModel?.getData("description")}</div>
            </div>
          </WidgetDataBlockBase>
        </Col>
        <Col sm={12}>
          <WidgetDataBlockBase className={"mt-2"}>
            <div className={"p-3"}>
              <div className={"mx-auto"}>
                <VanityLabelBase label={"Last Run Summary"} />
              </div>
              <div>{orchestrationHelper.getLastRunSummaryForPipelineModel(pipelineModel)}</div>
            </div>
          </WidgetDataBlockBase>
        </Col>
      </Row>
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
      minimumHeight={"560px"}
    >
      <div className={"px-3 pb-3"}>
        {getBody()}
        <ButtonContainerBase>
          <VanityButtonBase
            onClickFunction={handleViewDetailsButton}
            normalText={"View Details"}
            icon={faSearch}
          />
          <CloseButton
            className={"ml-2"}
            closeEditorCallback={closePanel}
          />
        </ButtonContainerBase>
      </div>
    </OverlayContainer>
  );
}

PipelineWorkflowSummaryOverlay.propTypes = {
  pipelineId: PropTypes.string,
};
