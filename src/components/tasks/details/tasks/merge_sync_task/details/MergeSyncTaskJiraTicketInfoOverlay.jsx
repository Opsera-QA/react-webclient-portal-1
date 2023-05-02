import React, {useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CenterOverlayContainer, { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import {Row, Col} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function MergeSyncTaskJiraTicketInfoOverlay({ model }) {

  const toastContext = useContext(DialogToastContext);

  const getBody = () => {
    return (
      <div className={"m-4"}>
        <Row className="mx-4">
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"id"}
            />
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"key"}
            />            
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"issuetype"}
            />
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"status"}
            />            
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"assignee"}
            />            
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"summary"}
            />            
          </Col>
          <Col lg={12}>
            <TextFieldBase
              dataObject={model}
              fieldName={"link"}
              showClipboardButton={true}
            />            
          </Col>
        </Row>        
      </div>
    );
  };

  const closePanel = () => {
    toastContext.clearInfoOverlayPanel();
  };

  if (model === undefined) {
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

MergeSyncTaskJiraTicketInfoOverlay.propTypes = {  
  model: PropTypes.object,
};

export default MergeSyncTaskJiraTicketInfoOverlay;
