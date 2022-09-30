import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";

function FortifyReportSummaryOverview({ fortifyResultsModel }) {

  if (fortifyResultsModel == null) {
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
        <TextFieldBase dataObject={fortifyResultsModel} fieldName={"fortifyApplicationId"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase dataObject={fortifyResultsModel} fieldName={"fortifyReleaseId"} />
      </Col>      
    </Row>
  );
}


FortifyReportSummaryOverview.propTypes = {
  fortifyResultsModel: PropTypes.object,
};

export default FortifyReportSummaryOverview;
