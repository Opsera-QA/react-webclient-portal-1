import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

// TODO: Implement
function JenkinsJobSummaryPanel({ jenkinsJobData } ) {

  return (
    <>
      { jenkinsJobData && <>
        <div className="scroll-y pt-3 px-3">
          <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
            <Row>
              {/*<Col lg={6}>*/}
              {/*  <TextFieldBase dataObject={jenkinsJobData} fieldName={""} />*/}
              {/*</Col>*/}
            </Row>
          </div>
        </div>
      </>}
    </>
  );
}

JenkinsJobSummaryPanel.propTypes = {
  jenkinsJobData: PropTypes.object,
};


export default JenkinsJobSummaryPanel;
