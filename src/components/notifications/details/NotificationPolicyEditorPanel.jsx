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
import TagManager from "components/common/inputs/tags/TagManager";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";
import NotificationMethodEditorPanel from "components/notifications/details/notifications/NotificationMethodEditorPanel";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

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
          <TextInputBase
            fieldName={"name"}
            dataObject={notificationModel}
            setDataObject={setNotificationModel}
          />
        </Col>
        <Col lg={6}>
          <ActivityToggleInput
            fieldName={"active"}
            dataObject={notificationModel}
            setDataObject={setNotificationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={notificationModel}
            setDataObject={setNotificationModel}
          />
        </Col>
        <Col lg={12}>
          <TagManager
            type={"notification"}
            dataObject={notificationModel}
            setDataObject={setNotificationModel}
          />
        </Col>
      </Row>
      <NotificationConfigurationPanel
        notificationConfigurationData={notificationConfigurationModel}
        notificationDataDto={notificationModel}
        setNotificationDataDto={setNotificationModel}
        setNotificationConfigurationData={setNotificationConfigurationModel}
      />
      <NotificationMethodEditorPanel
        notificationModel={notificationModel}
        setNotificationModel={setNotificationModel}
      />
      <Col lg={12}>
        <TextAreaInputBase
          fieldName={"nextSteps"}
          model={notificationModel}
          setModel={setNotificationModel}
        />
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


