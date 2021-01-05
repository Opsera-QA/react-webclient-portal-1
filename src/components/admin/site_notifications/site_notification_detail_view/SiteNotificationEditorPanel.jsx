import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import siteNotificationActions from "../site-notification-actions";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import CreateAndSaveButtonContainer from "../../../common/buttons/saving/containers/CreateAndSaveButtonContainer";
import SiteNotificationTypeInput
  from "../../../common/list_of_values_input/admin/site_notifications/SiteNotificationTypeInput";
import SiteNotificationViewInput
  from "../../../common/list_of_values_input/admin/site_notifications/SiteNotificationViewInput";

function SiteNotificationEditorPanel({ siteNotificationData, setSiteNotificationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [siteNotificationDto, setSiteNotificationDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setSiteNotificationDto(siteNotificationData);
    setIsLoading(false);
  };

  const createSiteNotification = async () => {
    return await siteNotificationActions.createSiteNotification(siteNotificationDto, getAccessToken);
  };

  const updateSiteNotification = async () => {
    return await siteNotificationActions.updateSiteNotification(siteNotificationDto, getAccessToken);
  };

  return (
    <EditorPanelContainer isLoading={isLoading}>
      <div className="mx-2">
        <Row>
          <Col md={6}>
            <SiteNotificationTypeInput setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <DtoTextInput fieldName={"header"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={12}>
            <DtoTextInput fieldName={"message"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <SiteNotificationViewInput disabled={true} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          {/*TODO: Make FQDN component after KPI website one is checked in*/}
          <Col md={6}>
            <DtoTextInput fieldName={"link"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            {/*<DateTimeInput fieldName={"expiration"} disabled={true} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>*/}
          </Col>
          <Col md={6}>
            <DtoToggleInput fieldName={"active"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
        </Row>
        <CreateAndSaveButtonContainer
          recordDto={siteNotificationDto}
          handleClose={handleClose}
          setRecordDto={setSiteNotificationDto}
          createRecord={createSiteNotification}
          updateRecord={updateSiteNotification}
        />
      </div>
    </EditorPanelContainer>
  );
}

SiteNotificationEditorPanel.propTypes = {
  siteNotificationData: PropTypes.object,
  setSiteNotificationData: PropTypes.func,
  handleClose: PropTypes.func
};

export default SiteNotificationEditorPanel;


