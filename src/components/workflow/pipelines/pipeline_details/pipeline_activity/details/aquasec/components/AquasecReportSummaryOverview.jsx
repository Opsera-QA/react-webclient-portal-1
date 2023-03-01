import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import {Col, Row} from "react-bootstrap";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function AquasecReportSummaryOverview({ aquasecSummaryObject, isLoading }) {    
  if (isLoading) {
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
      { aquasecSummaryObject && Object.keys(aquasecSummaryObject).length > 0 && Object.keys(aquasecSummaryObject).map(fieldName => {
        return (
          <Col lg={6} key={fieldName}>
            <StandaloneTextFieldBase label={String(fieldName).split("_").map(text => capitalizeFirstLetter(text)).join(" ")} text={aquasecSummaryObject[fieldName]} />
          </Col>
        );
      }) }

            
    </Row>
  );
}


AquasecReportSummaryOverview.propTypes = {
  aquasecSummaryObject: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default AquasecReportSummaryOverview;
