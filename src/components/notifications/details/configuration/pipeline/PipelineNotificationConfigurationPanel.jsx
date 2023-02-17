import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineNotificationConfigurationMetadata
  from "components/notifications/details/configuration/pipeline/pipeline-notification-configuration-metadata";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
<<<<<<< Updated upstream

function PipelineNotificationEditorPanel(
  {
    notificationModel,
=======
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

export default function PipelineNotificationEditorPanel(
  {
    notificationModel,
    setNotificationModel,
>>>>>>> Stashed changes
    notificationConfigurationModel,
    setNotificationConfigurationModel,
  }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationModel.getData("configuration"), pipelineNotificationConfigurationMetadata);
    setNotificationConfigurationModel({...configurationData});
  };

  if (notificationModel == null || notificationConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <TextAreaInput dataObject={notificationConfigurationModel} setDataObject={setNotificationConfigurationModel} fieldName={"trigger"} />
      </Col>
<<<<<<< Updated upstream
=======
      <Col lg={12}>
        <TextAreaInputBase
          fieldName={"nextSteps"}
          model={notificationModel}
          setModel={setNotificationModel}
        />
      </Col>
>>>>>>> Stashed changes
    </Row>
  );
}

PipelineNotificationEditorPanel.propTypes = {
  notificationModel: PropTypes.object,
<<<<<<< Updated upstream
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func
};

export default PipelineNotificationEditorPanel;


=======
  setNotificationModel: PropTypes.func,
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func,
};
>>>>>>> Stashed changes
