import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import RegistryToolRoleAccessInput from "components/inventory/tools/tool_details/input/RegistryToolRoleAccessInput";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ToolSummaryPanel({ toolData, setToolData, setActiveTab, customerAccessRules }) {
  useEffect(() => {
  }, [JSON.stringify(customerAccessRules)]);

  const authorizedAction = (action, dataObject) => {
    const owner = dataObject.owner;
    const objectRoles = dataObject.roles;
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} editingAllowed={authorizedAction("edit_tool_settings", toolData?.data)}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"owner_name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_identifier"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_type_identifier"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"classification"} />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={toolData} fieldName={"description"} />
        </Col>
        <Col lg={12}>
          <RegistryToolRoleAccessInput dataObject={toolData} setDataObject={setToolData} disabled={!authorizedAction("edit_access_roles", toolData?.data)} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolSummaryPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  setActiveTab: PropTypes.func,
  customerAccessRules: PropTypes.object,
};

export default ToolSummaryPanel;
