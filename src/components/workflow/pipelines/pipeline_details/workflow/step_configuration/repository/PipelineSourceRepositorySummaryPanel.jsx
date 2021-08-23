import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function PipelineSourceRepositorySummaryPanel({ sourceRepositoryModel, setActiveTab }) {
  if (sourceRepositoryModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"service"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"username"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"repoId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"workspace"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"workspaceName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"branch"}/>
        </Col>
        <Col lg={12}>
          <GenericItemField dataObject={sourceRepositoryModel} fieldName={"secondary_branches"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"gitUrl"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={sourceRepositoryModel} fieldName={"sshUrl"}/>
        </Col>
        <Col lg={12}>
          <BooleanField dataObject={sourceRepositoryModel} fieldName={"trigger_active"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

PipelineSourceRepositorySummaryPanel.propTypes = {
  sourceRepositoryModel: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default PipelineSourceRepositorySummaryPanel;
