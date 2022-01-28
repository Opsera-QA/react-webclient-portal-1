import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";

function AnalyticsDataEntrySummaryPanelContainer({ analyticsDataEntry, setActiveTab, children }) {
  if (analyticsDataEntry == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row className={"mx-0 mb-2"}>
        <Col lg={6}>
          <TextFieldBase dataObject={analyticsDataEntry} fieldName={"kpi_identifier"} />
        </Col>
        <Col lg={6}>
          <SmartIdField model={analyticsDataEntry} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={analyticsDataEntry} fieldName={"owner_name"} />
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={analyticsDataEntry} fieldName={"data.domain"} />
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={analyticsDataEntry} fieldName={"data.application"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={analyticsDataEntry} fieldName={"data.from"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={analyticsDataEntry} fieldName={"data.to"} />
        </Col>
        {children}
        <Col lg={12}>
          <TagField dataObject={analyticsDataEntry} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

AnalyticsDataEntrySummaryPanelContainer.propTypes = {
  analyticsDataEntry: PropTypes.object,
  setActiveTab: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AnalyticsDataEntrySummaryPanelContainer;
