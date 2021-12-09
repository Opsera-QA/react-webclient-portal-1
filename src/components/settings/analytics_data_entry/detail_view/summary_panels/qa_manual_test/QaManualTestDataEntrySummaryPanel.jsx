import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";

function QaManualTestDataEntrySummaryPanel({ analyticsDataEntry, qaManualTestData, setActiveTab }) {
  if (analyticsDataEntry == null) {
    return <LoadingDialog size="sm" />;
  }
  return (
    <AnalyticsDataEntrySummaryPanel setActiveTab={setActiveTab} analyticsDataEntry={analyticsDataEntry}>
      <Col lg={6}>
        <GenericItemField dataObject={qaManualTestData} fieldName={"sprint"} />
      </Col>
      <Col lg={6}>
        <GenericItemField dataObject={qaManualTestData} fieldName={"release"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"pipeline_id"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_total"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_executed"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_passed"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_failed"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_blocked"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={qaManualTestData} fieldName={"test_cases_skipped"} />
      </Col>
    </AnalyticsDataEntrySummaryPanel>
  );
}

QaManualTestDataEntrySummaryPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  qaManualTestData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default QaManualTestDataEntrySummaryPanel;
