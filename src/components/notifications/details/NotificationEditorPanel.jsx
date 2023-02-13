import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import notificationsActions from "components/notifications/notifications-actions";
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
import axios from "axios";

function NotificationEditorPanel({ notificationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [notificationDataDto, setNotificationDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [notificationConfigurationDataDto, setNotificationConfigurationDataDto] = useState(undefined);
  const [notificationMethodDataDto, setNotificationMethodDataDto] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setNotificationDataDto(notificationData);
    setIsLoading(false);
  };

  const createNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationsActions.createNotificationV2(getAccessToken, cancelTokenSource, notificationDataDto);
  };

  const updateNotification = async () => {
    const configuration = notificationConfigurationDataDto ? notificationConfigurationDataDto.getPersistData() : {};
    notificationDataDto.setData("configuration", configuration);
    const notificationMethod = notificationMethodDataDto ? notificationMethodDataDto.getPersistData() : {};
    notificationDataDto.setData("notification", notificationMethod);
    return await notificationsActions.updateNotificationV2(getAccessToken, cancelTokenSource, notificationDataDto);
  };
  
  if (notificationDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
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

NotificationEditorPanel.propTypes = {
  notificationData: PropTypes.object,
  setNotificationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default NotificationEditorPanel;


