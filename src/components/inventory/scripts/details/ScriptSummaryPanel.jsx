import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import OwnerNameField from "components/common/fields/text/general/OwnerNameField";
import ScriptLibraryCodeField from "components/common/fields/code/ScriptLibraryCodeField";

function ScriptSummaryPanel({ scriptModel }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={scriptModel} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <SmartIdField model={scriptModel} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <OwnerNameField model={scriptModel} fieldName={"owner_name"} />
        </Col>
        {/*TODO: Make ScriptField*/}
        <Col lg={6}>
          <TextFieldBase dataObject={scriptModel} fieldName={"type"} />
        </Col>
        <Col lg={12}>
          <ScriptLibraryCodeField model={scriptModel} fieldName={"value"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ScriptSummaryPanel.propTypes = {
  scriptModel: PropTypes.object,
};

export default ScriptSummaryPanel;
