import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import SiteNotificationTypeInput
  from "components/common/list_of_values_input/admin/site_notifications/SiteNotificationTypeInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SiteNotificationViewInput
  from "components/common/list_of_values_input/admin/site_notifications/SiteNotificationViewInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import siteNotificationActions from "components/admin/site_notifications/site-notification-actions";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import axios from "axios";

function SiteNotificationEditorPanel({ siteNotificationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [siteNotificationDto, setSiteNotificationDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    if(isMounted?.current === true){
      setIsLoading(true);
      setSiteNotificationDto(siteNotificationData);
      setIsLoading(false);
    }
  };

  const createSiteNotification = async () => {
    return await siteNotificationActions.createSiteNotificationV2(siteNotificationDto, getAccessToken, cancelTokenSource);
  };

  const updateSiteNotification = async () => {
    return await siteNotificationActions.updateSiteNotificationV2(siteNotificationDto, getAccessToken, cancelTokenSource);
  };

  if (siteNotificationDto == null) {
    return <></>;
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={siteNotificationDto}
      handleClose={handleClose}
      setRecordDto={setSiteNotificationDto}
      createRecord={createSiteNotification}
      updateRecord={updateSiteNotification}
      addAnotherOption={false}
    >
      <div className="mx-2">
        <Row>
          <Col md={6}>
            <SiteNotificationTypeInput setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <TextInputBase fieldName={"header"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <DateTimeInput fieldName={"displayOnDate"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <DateTimeInput fieldName={"expiration"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={12}>
            <TextInputBase fieldName={"message"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <SiteNotificationViewInput disabled={true} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          {/*TODO: Make FQDN component after KPI website one is checked in*/}
          <Col md={6}>
            <TextInputBase fieldName={"link"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
          <Col md={6}>
            <ActivityToggleInput fieldName={"active"} setDataObject={setSiteNotificationDto} dataObject={siteNotificationDto}/>
          </Col>
        </Row>
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


