import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import NotificationConfigurationPanel
  from "components/notifications/details/configuration_forms/NotificationConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TagManager from "components/common/inputs/tags/TagManager";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";
import NotificationEditorPanel from "components/notifications/details/notifications/NotificationEditorPanel";

function NotificationPolicyEditorPanel({ notificationData, handleClose }) {
  const [notificationModel, setNotificationModel] = useState({...notificationData});
  const [notificationConfigurationModel, setNotificationConfigurationModel] = useState(undefined);
  const notificationPolicyActions = useNotificationPolicyActions();
  
  const createNotification = async () => {
    return await notificationPolicyActions.createNotificationPolicy(notificationModel);
  };

  const updateNotification = async () => {
    return await notificationPolicyActions.updateNotificationPolicy(notificationModel);
  };
  
  if (notificationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={notificationModel}
      createRecord={createNotification}
      updateRecord={updateNotification}
      setRecordDto={setNotificationModel}
      lenient={true}
      disable={
        !notificationModel.checkCurrentValidity()
        || (notificationConfigurationModel == null || !notificationConfigurationModel.checkCurrentValidity())
      }
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setNotificationModel} dataObject={notificationModel} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput dataObject={notificationModel} setDataObject={setNotificationModel} fieldName={"active"} />
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setNotificationModel} dataObject={notificationModel} fieldName={"description"}/>
        </Col>
        <Col lg={12}>
          <TagManager type={"notification"} setDataObject={setNotificationModel} dataObject={notificationModel}/>
        </Col>
      </Row>
      <NotificationConfigurationPanel
        notificationConfigurationData={notificationConfigurationModel}
        notificationDataDto={notificationModel}
        setNotificationDataDto={setNotificationModel}
        setNotificationConfigurationData={setNotificationConfigurationModel}
      />
      <NotificationEditorPanel
        notificationModel={notificationModel}
        setNotificationModel={setNotificationModel}
      />
      <Col lg={12} className={"px-0"}>
        <TextAreaInput setDataObject={setNotificationModel} dataObject={notificationModel} fieldName={"nextSteps"}/>
      </Col>
    </EditorPanelContainer>
  );
}

NotificationPolicyEditorPanel.propTypes = {
  notificationData: PropTypes.object,
  setNotificationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default NotificationPolicyEditorPanel;


