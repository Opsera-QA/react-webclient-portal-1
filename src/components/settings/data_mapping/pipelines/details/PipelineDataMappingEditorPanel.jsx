import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import PipelineMockWorkflowEditorPanel
  from "components/common/metrics/mock_pipeline/workflow/PipelineMockWorkflowEditorPanel";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";
import AnalyticsDataMappingEditWarningMessage
  from "components/settings/data_mapping/AnalyticsDataMappingEditWarningMessage";

function PipelineDataMappingEditorPanel(
  {
    pipelineDataMappingModel,
    setPipelineDataMappingModel,
    handleClose,
  }) {

  const getWarningMessage = () => {
    if (pipelineDataMappingModel?.isNew() !== true) {
      return (
        <AnalyticsDataMappingEditWarningMessage />
      );
    }
  };

  if (pipelineDataMappingModel == null) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <VanityEditorPanelContainer
      model={pipelineDataMappingModel}
      setModel={setPipelineDataMappingModel}
      handleClose={handleClose}
      className={"mx-3 my-2"}
    >
      {getWarningMessage()}
      <Row>
        <Col xs={12}>
          <TextInputBase
            fieldName={"name"}
            dataObject={pipelineDataMappingModel}
            setDataObject={setPipelineDataMappingModel}
          />
        </Col>
        <Col xs={12}>
          <TextInputBase
            fieldName={"externalId"}
            dataObject={pipelineDataMappingModel}
            setDataObject={setPipelineDataMappingModel}
          />
        </Col>
        <Col xs={12}>
          <PipelineMockWorkflowEditorPanel
            model={pipelineDataMappingModel}
            setModel={setPipelineDataMappingModel}
            fieldName={"workflow"}
          />
        </Col>
        <Col xs={12}>
          <TagMultiSelectInput
            fieldName={"tags"}
            dataObject={pipelineDataMappingModel}
            setDataObject={setPipelineDataMappingModel}
          />
        </Col>
        <Col xs={12}>
          <RoleAccessInput
            model={pipelineDataMappingModel}
            setModel={setPipelineDataMappingModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

PipelineDataMappingEditorPanel.propTypes = {
  pipelineDataMappingModel: PropTypes.object,
  setPipelineDataMappingModel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default PipelineDataMappingEditorPanel;
