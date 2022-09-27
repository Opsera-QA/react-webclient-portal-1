import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import RegistryToolRoleAccessInput from "components/inventory/tools/tool_details/input/RegistryToolRoleAccessInput";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import ToolVaultField from "components/common/fields/inventory/tools/vault/ToolVaultField";
import RbacWarningField from "temp-library-components/fields/rbac/RbacWarningField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";

export default function ToolSummaryPanel({ toolData, setToolData, setActiveTab }) {
  if (toolData == null) {
    return null;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} editingAllowed={toolData?.canUpdate()}>
      <Row>
        {/*<RbacWarningField model={toolData} />*/}
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"owner_name"} />
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
          <SmartIdField
            model={toolData}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <RegistryToolRoleAccessInput
            toolModel={toolData}
            setToolModel={setToolData}
          />
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
};
