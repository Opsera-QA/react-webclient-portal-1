import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TagField from "components/common/fields/multiple_items/tags/TagField";

function ToolCategorySummaryPanel({ toolCategoryData, setActiveTab }) {
  if (toolCategoryData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolCategoryData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolCategoryData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolCategoryData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolCategoryData} fieldName={"identifier"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={toolCategoryData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={toolCategoryData} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <TagField dataObject={toolCategoryData} fieldName={"tags"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolCategorySummaryPanel.propTypes = {
  toolCategoryData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ToolCategorySummaryPanel;
