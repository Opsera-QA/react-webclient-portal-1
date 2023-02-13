import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import NotificationConfigurationPanel
  from "components/notifications/details/configuration_forms/NotificationConfigurationPanel";
import NotificationMethodConfigurationPanel 
  from "components/notifications/details/methods/NotificationMethodConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TagManager from "components/common/inputs/tags/TagManager";
import useNotificationPolicyActions from "hooks/notification_policies/useNotificationPolicyActions";

function NotificationPolicyEditorPanel({ notificationData, handleClose }) {
  const [notificationDataDto, setNotificationDataDto] = useState({...notificationData});
  const [notificationConfigurationDataDto, setNotificationConfigurationDataDto] = useState(undefined);
  const [notificationMethodDataDto, setNotificationMethodDataDto] = useState(undefined);
  const notificationPolicyActions = useNotificationPolicyActions();
  
  const createNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationPolicyActions.createNotificationPolicy(notificationDataDto);
  };

  const updateNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationPolicyActions.updateNotificationPolicy(notificationDataDto);
  };
  
  if (notificationDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={notificationDataDto}
      createRecord={createNotification}
      updateRecord={updateNotification}
      setRecordDto={setNotificationDataDto}
      lenient={true}
      disable={
        !notificationDataDto.checkCurrentValidity()
        || (notificationConfigurationDataDto == null || !notificationConfigurationDataDto.checkCurrentValidity())
        || (notificationMethodDataDto == null || !notificationMethodDataDto.checkCurrentValidity())
      }
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setNotificationDataDto} dataObject={notificationDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput dataObject={notificationDataDto} setDataObject={setNotificationDataDto} fieldName={"active"} />
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setNotificationDataDto} dataObject={notificationDataDto} fieldName={"description"}/>
        </Col>
        <Col lg={12}>
          <TagManager type={"notification"} setDataObject={setNotificationDataDto} dataObject={notificationDataDto}/>
        </Col>
      </Row>
      <NotificationConfigurationPanel
        notificationConfigurationData={notificationConfigurationDataDto}
        notificationDataDto={notificationDataDto}
        setNotificationDataDto={setNotificationDataDto}
        setNotificationConfigurationData={setNotificationConfigurationDataDto}
      />
      <NotificationMethodConfigurationPanel
        notificationDataDto={notificationDataDto}
        setNotificationDataDto={setNotificationDataDto}
        notificationMethodDataDto={notificationMethodDataDto}
        setNotificationMethodDataDto={setNotificationMethodDataDto}
      />
      <Col lg={12} className={"px-0"}>
        <TextAreaInput setDataObject={setNotificationDataDto} dataObject={notificationDataDto} fieldName={"nextSteps"}/>
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


