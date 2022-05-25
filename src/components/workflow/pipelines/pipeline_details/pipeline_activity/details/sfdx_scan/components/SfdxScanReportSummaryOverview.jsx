import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import SfdxScanLogSummaryTable from "./SfdxScanLogSummaryTable";

function SfdxScanReportSummaryOverview({ statusSummaryModel, sfdxScanResults }) {
  if (statusSummaryModel == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Overview"}
        size={'sm'}
      />
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}><H4FieldSubHeader subheaderText={"Execution Overview"}/></Col>
      {/*<Col lg={6}>*/}
      {/*  <TextFieldBase dataObject={statusSummaryModel} fieldName={"status"} />*/}
      {/*</Col>*/}
      <Col lg={12}>
        <TextFieldBase dataObject={statusSummaryModel} fieldName={"message"} />
      </Col>
        <Col lg={12}>
            <SfdxScanLogSummaryTable summaryQGObject={sfdxScanResults}/>
        </Col>
    </Row>
  );
}


SfdxScanReportSummaryOverview.propTypes = {
    statusSummaryModel: PropTypes.object,
    sfdxScanResults: PropTypes.object,
};

export default SfdxScanReportSummaryOverview;