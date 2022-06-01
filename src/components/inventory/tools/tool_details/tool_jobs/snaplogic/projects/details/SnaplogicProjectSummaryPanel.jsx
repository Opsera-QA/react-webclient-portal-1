import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function SnaplogicProjectSummaryPanel({ snaplogicProject } ) {
  if (snaplogicProject == null) {
    return null;
  }

  return (
    <div className="scroll-y pt-3 px-3 hide-x-overflow">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          <Col lg={12}>
            <TextFieldBase dataObject={snaplogicProject} fieldName={"project"} />
          </Col>
          <Col lg={6}>
            <TextFieldBase dataObject={snaplogicProject} fieldName={"projectSpace"} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

SnaplogicProjectSummaryPanel.propTypes = {
  snaplogicProject: PropTypes.object,
};


export default SnaplogicProjectSummaryPanel;
