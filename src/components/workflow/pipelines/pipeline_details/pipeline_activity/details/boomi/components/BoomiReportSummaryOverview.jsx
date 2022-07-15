import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

function BoomiReportSummaryOverview({ boomiResultsModel }) {

    console.log(boomiResultsModel);
  if (boomiResultsModel == null) {
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
        <TextFieldBase dataObject={boomiResultsModel} fieldName={"numberOfComponentsTotal"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={boomiResultsModel} fieldName={"numberOfComponentsSuccess"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={boomiResultsModel} fieldName={"numberOfComponentsErrors"} />
      </Col>
    </Row>
  );
}


BoomiReportSummaryOverview.propTypes = {
  boomiResultsModel: PropTypes.object,
};

export default BoomiReportSummaryOverview;