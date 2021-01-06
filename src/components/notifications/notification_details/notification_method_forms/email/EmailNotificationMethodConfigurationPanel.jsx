import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import emailNotificationMetadata
  from "components/notifications/notification_details/notification_method_forms/email/emailNotificationMetadata";
import {Row, Col} from "react-bootstrap";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";

function EmailNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), emailNotificationMetadata);
    setNotificationMethodDataDto({...configurationData});
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <DtoTextInput dataObject={notificationMethodDataDto} setDataObject={setNotificationMethodDataDto} fieldName={"address"} />
      </Col>
    </Row>
  );
}

EmailNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default EmailNotificationMethodConfigurationPanel;


