import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import PipelineMockWorkflowEditorPanel
  from "components/common/metrics/mock_pipeline/workflow/PipelineMockWorkflowEditorPanel";

function PipelineDataMappingEditorPanel(
  {
    pipelineDataMappingModel,
    setPipelineDataMappingModel,
    handleClose,
  }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getWarningMessage = () => {
    if (pipelineDataMappingModel?.isNew() !== true) {
      return (
        <div className="m-2">
          <Card>
            <Card.Text className={"mt-3 mb-3"} style={{display: "flex", justifyContent: "center"}}>
              <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
              functionality from data previously mapped with this information
            </Card.Text>
          </Card>
        </div>
      );
    }
  };

  if (pipelineDataMappingModel == null) {
    return <LoadingDialog size="sm" />;
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
            fieldName={"roles"}
            dataObject={pipelineDataMappingModel}
            setDataObject={setPipelineDataMappingModel}
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
