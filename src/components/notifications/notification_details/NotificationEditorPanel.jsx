import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import notificationsActions from "components/notifications/notifications-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import DtoTagManagerInput from "components/common/input/dto_input/dto-tag-manager-input";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import NotificationConfigurationPanel
  from "components/notifications/notification_details/configuration_forms/NotificationConfigurationPanel";
import NotificationMethodConfigurationPanel 
  from "components/notifications/notification_details/notification_method_forms/NotificationMethodConfigurationPanel";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function NotificationEditorPanel({ notificationData, setNotificationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [notificationDataDto, setNotificationDataDto] = useState(undefined);
  const [notificationConfigurationDataDto, setNotificationConfigurationDataDto] = useState(undefined);
  const [notificationMethodDataDto, setNotificationMethodDataDto] = useState(undefined);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setNotificationDataDto(notificationData);
  };

  const createNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationsActions.createNotification(notificationDataDto, getAccessToken);
  };

  const updateNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationsActions.updateNotification(notificationDataDto, getAccessToken);
  };
  
  if (notificationDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer>
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setNotificationDataDto} dataObject={notificationDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput dataObject={notificationDataDto} setDataObject={setNotificationDataDto} fieldName={"active"} />
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setNotificationDataDto} dataObject={notificationDataDto}
                        fieldName={"description"}/>
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
      <Row>
        <Col lg={6}>
          <DtoTagManagerInput
            type={"notification"}
            setDataObject={setNotificationDataDto}
            dataObject={notificationDataDto}
            fieldName={"tags"}
          />
        </Col>
      </Row>
      <PersistButtonContainer
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
      />
    </EditorPanelContainer>
  );
}

NotificationEditorPanel.propTypes = {
  notificationData: PropTypes.object,
  setNotificationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default NotificationEditorPanel;


