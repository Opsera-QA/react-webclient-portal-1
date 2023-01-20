import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function BoomiStepConfigurationSummary({
  boomiPipelineDataObject,
  pipelineData,
  setActiveTab,
}) {
  if (boomiPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer
      setActiveTab={setActiveTab}
      pipelineData={pipelineData}
    >
      <Row>
        <Col lg={6}>
          <ToolNameField
            model={boomiPipelineDataObject}
            fieldName={"boomiToolId"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            model={boomiPipelineDataObject}
            fieldName={"jobType"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"service"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"repository"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"gitBranch"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"fileName"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"filePath"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"environmentName"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={boomiPipelineDataObject}
            fieldName={"targetEnvironmentName"}
          />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

BoomiStepConfigurationSummary.propTypes = {
  boomiPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default BoomiStepConfigurationSummary;
