import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import NameValueFieldBase from "components/common/fields/multiple_items/NameValueFieldBase";
import {faBrowser, faBuilding, faClipboardCheck, faIdCard} from "@fortawesome/pro-light-svg-icons";
import ContactField from "components/common/fields/multiple_items/ContactField";
import OrganizationsField from "components/common/fields/multiple_items/OrganizationsField";

function ToolAttributesPanel({ toolData, setActiveTab }) {
  return (
    <SummaryPanelContainer
      setActiveTab={setActiveTab}
      editingAllowed={toolData?.canUpdate()}
      settingsTab="attribute_settings"
    >
      <Row>
        <Col sm={12} lg={6}>
          <OrganizationsField dataObject={toolData} fieldName={"organization"} />
        </Col>
        <Col sm={12} lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"location"} icon={faBuilding} />
        </Col>
        <Col sm={12} lg={6}>
          <ContactField dataObject={toolData} fieldName={"contacts"} />
        </Col>
        <Col sm={12} lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"applications"} icon={faBrowser} />
        </Col>
        <Col sm={12} lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"licensing"} icon={faIdCard}/>
        </Col>
        <Col sm={12} lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"compliance"} icon={faClipboardCheck} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolAttributesPanel.propTypes = {
  toolData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default ToolAttributesPanel;
