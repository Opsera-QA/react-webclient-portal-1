import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import AnalyticsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/AnalyticsDataEntrySummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";

function CumulativeOpenDefectsDataEntrySummaryPanel({ analyticsDataEntry, cumulativeOpenDefectsData, setActiveTab }) {
  if (analyticsDataEntry == null) {
    return <LoadingDialog size="sm" />;
  }
  return (
    <AnalyticsDataEntrySummaryPanel setActiveTab={setActiveTab} analyticsDataEntry={analyticsDataEntry}>
      <Col lg={6}>
        <GenericItemField dataObject={cumulativeOpenDefectsData} fieldName={"sprint"} />
      </Col>
      <Col lg={6}>
        <GenericItemField dataObject={cumulativeOpenDefectsData} fieldName={"release"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={cumulativeOpenDefectsData} fieldName={"total_defects"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={cumulativeOpenDefectsData} fieldName={"valid_defects_open"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={cumulativeOpenDefectsData} fieldName={"valid_defects_closed"} />
      </Col>
    </AnalyticsDataEntrySummaryPanel>
  );
}

CumulativeOpenDefectsDataEntrySummaryPanel.propTypes = {
  analyticsDataEntry: PropTypes.object,
  cumulativeOpenDefectsData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default CumulativeOpenDefectsDataEntrySummaryPanel;
