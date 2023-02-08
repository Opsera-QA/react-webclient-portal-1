import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import ToolIdentifierNameField from "components/common/fields/tool_identifier/ToolIdentifierNameField";
import ExternalToolPropertyCacheField from "components/common/fields/cache/ExternalToolPropertyCacheField";
import JiraProjectUserCacheField
  from "components/common/list_of_values_input/tools/jira/users/JiraProjectUserCacheField";
import toolIdentifierConstants from "@opsera/definitions/constants/tool_identifiers/toolIdentifier.constants";

export default function UserDataMappingSummaryPanel({ userDataMappingModel, setActiveTab }) {
  const getUserField = () => {
    switch (userDataMappingModel?.getData("tool_identifier")) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.JIRA:
        return (
          <Col lg={6}>
            <JiraProjectUserCacheField
              model={userDataMappingModel}
              fieldName={"tool_user_id"}
              jiraToolIdFieldName={"tool_id"}
              externalCacheLabelPropertyName={"displayName"}
            />
          </Col>
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
      case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
        return (
          <Col lg={6}>
            <ExternalToolPropertyCacheField
              model={userDataMappingModel}
              fieldName={"tool_user_id"}
              toolIdFieldName={"tool_id"}
              externalCacheLabelPropertyName={"name"}
            />
          </Col>
        );
    }
  };

  if (userDataMappingModel === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <ToolIdentifierNameField model={userDataMappingModel} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={userDataMappingModel} fieldName={"tool_id"}/>
        </Col>
        {getUserField()}
        <Col lg={6}>
          <EmailAddressField model={userDataMappingModel} fieldName={"tool_user_email"}/>
        </Col>
        <Col lg={6}>
          <EmailAddressField model={userDataMappingModel} fieldName={"opsera_user_email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"tool_user_prop"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={userDataMappingModel} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

UserDataMappingSummaryPanel.propTypes = {
  userDataMappingModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};
