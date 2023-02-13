import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/details/configuration_forms/pipeline/pipeline-notification-configuration-metadata";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// TODO: If this is used in multiple spots, we should rename it. If it just has trigger, I would suggest TriggerNotificationEditorPanel
function PipelineNotificationEditorPanel({ notificationDataDto, notificationConfigurationData, setNotificationConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("configuration"), pipelineNotificationConfigurationMetadata);
    setNotificationConfigurationData({...configurationData});
  };

  if (notificationDataDto == null || notificationConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <TextAreaInput dataObject={notificationConfigurationData} setDataObject={setNotificationConfigurationData} fieldName={"trigger"} />
      </Col>
    </Row>
  );
}

PipelineNotificationEditorPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationConfigurationData: PropTypes.object,
  setNotificationConfigurationData: PropTypes.func
};

export default PipelineNotificationEditorPanel;


