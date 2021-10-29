import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import BooleanPropertiesField from "components/common/fields/multiple_items/BooleanPropertiesField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";

function ToolIdentifierSummaryPanel({ toolIdentifierData, setActiveTab }) {
  if (toolIdentifierData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"identifier"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"tool_type_identifier"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolIdentifierData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <SmartIdField model={toolIdentifierData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={toolIdentifierData} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"usageType"}/>
        </Col>
        <Col lg={12}>
          <TagField dataObject={toolIdentifierData} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={toolIdentifierData} fieldName={"enabledInRegistry"}/>
        </Col>
        <Col lg={6}>
          <BooleanPropertiesField dataObject={toolIdentifierData} fieldName={"properties"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolIdentifierSummaryPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ToolIdentifierSummaryPanel;
