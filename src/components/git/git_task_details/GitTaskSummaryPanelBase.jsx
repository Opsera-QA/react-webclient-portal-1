import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import TagField from "components/common/fields/multiple_items/TagField";

function GitTaskSummaryPanelBase({ gitTasksData, setActiveTab, gitTaskTypeSummaryCard }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"_id"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"type"}/>
        </Col>
        <Col md={6}>
          <DateFieldBase dataObject={gitTasksData} fieldName={"createdAt"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"tool_identifier"}/>
        </Col>
        <Col md={12} className={"pt-1"}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"description"}/>
        </Col>
        <Col md={12} className={"pt-1"}>
          <TagField dataObject={gitTasksData} fieldName={"tags"}/>
        </Col>
      </Row>
      <div className="px-3 mt-3">{gitTaskTypeSummaryCard}</div>
    </SummaryPanelContainer>
  );
}

GitTaskSummaryPanelBase.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  gitTaskTypeSummaryCard: PropTypes.object,
};

export default GitTaskSummaryPanelBase;
