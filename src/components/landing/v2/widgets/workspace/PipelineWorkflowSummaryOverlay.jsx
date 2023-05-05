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
import useGetPipelineModelById from "hooks/workflow/pipelines/model/useGetPipelineModelById";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import {errorHelpers} from "components/common/helpers/error-helpers";

// TODO: Should this be two separate panels?
export default function PipelineWorkflowSummaryOverlay({ pipelineId }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const {
    pipelineModel,
    setPipelineModel,
    error,
    loadData,
    isLoading,
  } = useGetPipelineModelById(pipelineId);

  const handleViewDetailsButton = () => {
    history.push(pipelineModel?.getDetailViewLink());
    closePanel();
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (isLoading === true) {
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
        <Col xs={6}>
          <TextFieldBase
            dataObject={pipelineModel}
            fieldName={"workflow.run_count"}
          />
        </Col>
        <Col xs={6}>
          <PipelineLastRunDateField
            pipelineModel={pipelineModel}
          />
        </Col>
        <Col xs={12}>
          <TextFieldBase
            dataObject={pipelineModel}
            fieldName={"description"}
          />
        </Col>
        <Col sm={12}>
          <PipelineOrchestrationSummaryField
            pipelineModel={pipelineModel}
          />
        </Col>
        <Col sm={12}>
          <PipelineDurationMetricsStandaloneField
            pipelineId={pipelineModel?.getMongoDbId()}
            pipelineRunCount={pipelineModel?.getRunCount()}
          />
        </Col>
      </Row>
    );
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={pipelineModel?.getData("name")}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
      minimumHeight={"50vh"}
      maximumHeight={"50vh"}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
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
    </CenterOverlayContainer>
  );
}

PipelineWorkflowSummaryOverlay.propTypes = {
  pipelineId: PropTypes.string,
};
