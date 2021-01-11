import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TagField from "components/common/fields/multiple_items/TagField";

function ToolTypeSummaryPanel({ toolTypeData, setToolTypeData, setActiveTab }) {
  if (toolTypeData == null) {
    return <LoadingDialog size="sm" />
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolTypeData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolTypeData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolTypeData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolTypeData} fieldName={"identifier"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolTypeData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={toolTypeData} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <TagField dataObject={toolTypeData} fieldName={"tags"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolTypeSummaryPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  setActiveTab: PropTypes.func
};


export default ToolTypeSummaryPanel;
