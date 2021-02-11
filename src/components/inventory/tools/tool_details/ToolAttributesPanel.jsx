import React, {useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TagField from "components/common/fields/multiple_items/TagField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import NameValueFieldBase from "components/common/fields/multiple_items/NameValueFieldBase";
import {faBrowser, faBuilding, faClipboardCheck, faIdCard, faSitemap} from "@fortawesome/pro-light-svg-icons";
import ContactField from "components/common/fields/multiple_items/ContactField";

function ToolAttributesPanel({ toolData, setActiveTab, customerAccessRules }) {
  useEffect(() => {
  }, [JSON.stringify(customerAccessRules)]);

  const authorizedAction = (action, dataObject) => {
    const owner = dataObject.owner;
    const objectRoles = dataObject.roles;
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  return (
    <SummaryPanelContainer
      setActiveTab={setActiveTab}
      editingAllowed={authorizedAction("edit_tool_settings", toolData?.data)}
      settingsTab="attribute_settings"
    >
      <Row>
        <Col lg={6}>
          <TagField dataObject={toolData} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"costCenter"}/>
        </Col>
        <Col lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"licensing"} icon={faIdCard}/>
        </Col>
        <Col lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"compliance"} icon={faClipboardCheck} />
        </Col>
        <Col lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"location"} icon={faBuilding} />
        </Col>
        <Col lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"applications"} icon={faBrowser} />
        </Col>
        <Col lg={6}>
          <NameValueFieldBase dataObject={toolData} fieldName={"organization"} icon={faSitemap} />
        </Col>
        <Col lg={6}>
          <ContactField dataObject={toolData} fieldName={"contacts"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolAttributesPanel.propTypes = {
  toolData: PropTypes.object,
  setActiveTab: PropTypes.func,
  customerAccessRules: PropTypes.object,
}

export default ToolAttributesPanel;
