import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import RegistryToolRoleAccessInput from "components/inventory/tools/tool_details/input/RegistryToolRoleAccessInput";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import TagField from "components/common/fields/multiple_items/TagField";
import ToolVaultField from "components/common/fields/inventory/tools/vault/ToolVaultField";

function ToolSummaryPanel({ toolData, setToolData, setActiveTab, customerAccessRules }) {
  useEffect(() => {
  }, [JSON.stringify(customerAccessRules)]);

  const authorizedAction = (action, dataObject) => {
    const owner = dataObject?.owner;
    const objectRoles = dataObject?.roles;
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  if (toolData == null) {
    return null;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} editingAllowed={authorizedAction("edit_tool_settings", toolData?.data)}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_identifier"} />
        </Col>
        <Col sm={12} lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"costCenter"}/>
        </Col>
        <Col sm={12} lg={6}>
          <TagField dataObject={toolData} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"classification"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"tool_type_identifier"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"owner_name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <RegistryToolRoleAccessInput dataObject={toolData} setDataObject={setToolData} disabled={!authorizedAction("edit_access_roles", toolData?.data)} />
        </Col>
        <Col lg={6}>
          <ToolVaultField model={toolData} fieldName={"vault"} />
        </Col>
        <Col lg={12} sm={12}>
          <TextFieldBase dataObject={toolData} fieldName={"description"} />
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
