import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
    from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function ProvarStepConfigSummary({ provarPipelineDataObject, pipelineData, setActiveTab }) {
    if (provarPipelineDataObject == null) {
        return <LoadingDialog size="sm" />;
    }

    return (
        <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
            <Row>
                <Col lg={6}>
                    <ToolNameField model={provarPipelineDataObject} fieldName={"provarToolId"}/>
                </Col>
                <Col lg={6}>
                    <ToolNameField model={provarPipelineDataObject} fieldName={"sfdcToolId"}/>
                </Col>
                <Col lg={6}>
                    <TextFieldBase dataObject={provarPipelineDataObject} fieldName={"service"}/>
                </Col>
                <Col lg={6}>
                    <TextFieldBase dataObject={provarPipelineDataObject} fieldName={"repository"}/>
                </Col>
                <Col lg={6}>
                    <TextFieldBase dataObject={provarPipelineDataObject} fieldName={"gitBranch"}/>
                </Col>
                <Col lg={6}>
                    <TextFieldBase dataObject={provarPipelineDataObject} fieldName={"antTarget"}/>
                </Col>
                <Col lg={6}>
                    <TextFieldBase dataObject={provarPipelineDataObject} fieldName={"buildXmlPath"}/>
                </Col>
            </Row>
        </PipelineStepSummaryPanelContainer>
    );
}

ProvarStepConfigSummary.propTypes = {
    provarPipelineDataObject: PropTypes.object,
    pipelineData: PropTypes.object,
    setActiveTab: PropTypes.func
};


export default ProvarStepConfigSummary;
