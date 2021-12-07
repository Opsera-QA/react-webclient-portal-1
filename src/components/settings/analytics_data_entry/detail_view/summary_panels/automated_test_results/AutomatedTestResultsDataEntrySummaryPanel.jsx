import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";

function AutomatedTestResultsDataEntrySummaryPanel({ analyticsDataEntry, automatedTestResultsData, setActiveTab }) {
  if (analyticsDataEntry == null) {
    return <LoadingDialog size="sm" />;
  }
  return (
    <AnalyticsDataEntrySummaryPanel setActiveTab={setActiveTab} analyticsDataEntry={analyticsDataEntry}>
      <Col lg={6}>
        <GenericItemField dataObject={automatedTestResultsData} fieldName={"sprint"} />
      </Col>
      <Col lg={6}>
        <GenericItemField dataObject={automatedTestResultsData} fieldName={"release"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={automatedTestResultsData} fieldName={"total_executed"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={automatedTestResultsData} fieldName={"total_manual"} />
      </Col>
    </AnalyticsDataEntrySummaryPanel>
  );
}

AutomatedTestResultsDataEntrySummaryPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  automatedTestResultsData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default AutomatedTestResultsDataEntrySummaryPanel;
