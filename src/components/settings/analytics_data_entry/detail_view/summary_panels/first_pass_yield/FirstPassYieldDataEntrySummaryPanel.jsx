import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";

function FirstPassYieldDataEntrySummaryPanel({ analyticsDataEntry, firstPassYieldData, setActiveTab }) {
  if (analyticsDataEntry == null) {
    return <LoadingDialog size="sm" />;
  }
  return (
    <AnalyticsDataEntrySummaryPanel setActiveTab={setActiveTab} analyticsDataEntry={analyticsDataEntry}>
      <Col lg={6}>
        <GenericItemField dataObject={firstPassYieldData} fieldName={"sprint"} />
      </Col>
      <Col lg={6}>
        <GenericItemField dataObject={firstPassYieldData} fieldName={"release"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={firstPassYieldData} fieldName={"pipeline_id"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={firstPassYieldData} fieldName={"total_test_cases"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={firstPassYieldData} fieldName={"test_cases_passed"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={firstPassYieldData} fieldName={"test_cases_failed"} />
      </Col>
    </AnalyticsDataEntrySummaryPanel>
  );
}

FirstPassYieldDataEntrySummaryPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  firstPassYieldData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default FirstPassYieldDataEntrySummaryPanel;
