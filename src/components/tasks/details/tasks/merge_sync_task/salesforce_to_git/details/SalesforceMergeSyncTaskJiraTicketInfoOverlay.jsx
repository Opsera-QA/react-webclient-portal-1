import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CenterOverlayContainer, { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import {Row, Col} from "react-bootstrap";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function SalesforceMergeSyncTaskJiraTicketInfoOverlay({ selectedTicket }) {
  const toastContext = useContext(DialogToastContext);

  const getBody = () => {
    return (
      <div className={"m-4"}>
        <Row className="mx-4">
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Issue Id"} text={selectedTicket.id} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Issue Key"} text={selectedTicket.key} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Issue Type"} text={selectedTicket.issuetype} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Status"} text={selectedTicket.status} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Assignee"} text={selectedTicket.assignee} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Summary"} text={selectedTicket.summary} />
          </Col>
          <Col lg={12}>
            <StandaloneTextFieldBase label={"Link"} text={selectedTicket.link} showClipboardButton={true} />
          </Col>
        </Row>        
      </div>
    );
  };

  const closePanel = () => {
    toastContext.clearInfoOverlayPanel();
  };

  if (!selectedTicket) {
    return null;
  }

  return (
    <CenterOverlayContainer
      titleText={`View Jira Issue Details`}
      closePanel={closePanel}
      size={CENTER_OVERLAY_SIZES.SMALL}
      bodyClassName={""}
    >
      <div className={"d-flex"}>
        {getBody()}
      </div>
    </CenterOverlayContainer>
  );
}

SalesforceMergeSyncTaskJiraTicketInfoOverlay.propTypes = {  
  selectedTicket: PropTypes.object,
};

export default SalesforceMergeSyncTaskJiraTicketInfoOverlay;
