import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import BooleanField from "components/common/fields/boolean/BooleanField";
import DateTimeField from "components/common/fields/date/DateTimeField";

function InformaticaReportSummaryOverview({ informaticaResultsModel }) {    
  if (informaticaResultsModel == null) {
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
      <Col lg={6}>
        <TextFieldBase dataObject={informaticaResultsModel} fieldName={"id"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={informaticaResultsModel} fieldName={"name"} />
      </Col>
      <Col lg={6}>
        <DateTimeField dataObject={informaticaResultsModel} fieldName={"startTime"} />
      </Col>
      <Col lg={6}>
        <DateTimeField dataObject={informaticaResultsModel} fieldName={"endTime"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={informaticaResultsModel} fieldName={"status.state"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={informaticaResultsModel} fieldName={"status.message"} />
      </Col>
    </Row>
  );
}


InformaticaReportSummaryOverview.propTypes = {
    informaticaResultsModel: PropTypes.object,
};

export default InformaticaReportSummaryOverview;