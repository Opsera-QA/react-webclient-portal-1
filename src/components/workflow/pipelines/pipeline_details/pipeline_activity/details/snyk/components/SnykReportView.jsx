import React from "react";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import { Col, Row } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import SnykOpenSourceReportTable from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/components/SnykOpenSourceReportTable";
import SnykSastScanReportTable from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/snyk/components/SnykSastScanReportTable";

function SnykReportView({ openSourceReport, sastScanReport }) {
  return (
    <SummaryPanelContainer className={"m-3"}>
      <Row>
        <Col lg={12}>
          <SnykOpenSourceReportTable openSourceReport={openSourceReport} />
        </Col>
        <Col lg={12}>
          <SnykSastScanReportTable sastScanReport={sastScanReport} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

SnykReportView.propTypes = {
  openSourceReport: PropTypes.array,
  sastScanReport: PropTypes.array,
};

export default SnykReportView;
