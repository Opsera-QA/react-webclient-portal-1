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

// TODO: Should this be two separate panels?
export default function PipelineWorkflowSummaryOverlay({ pipelineModel }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();

  const handleViewDetailsButton = () => {
    history.push(pipelineModel?.getDetailViewLink());
    closePanel();
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (pipelineModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={pipelineModel?.getData("name")}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
      minimumHeight={"50vh"}
      maximumHeight={"50vh"}
    >
      <div className={"p-3"}>
        <Row>
          <Col xs={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"run_count"}
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
  pipelineModel: PropTypes.object,
};
