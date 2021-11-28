import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";

function ResetMetricOptionsEditorPanel({ resetKpiModel, setResetKpiModel }) {
  if (resetKpiModel == null) {
    return null;
  }

  return (
    <Row>
      <Col md={12}>
        <CheckboxInputBase
          fieldName={"name"}
          model={resetKpiModel}
          setModel={setResetKpiModel}
        />
      </Col>
      <Col md={12}>
        <CheckboxInputBase
          fieldName={"internalProperties"}
          model={resetKpiModel}
          setModel={setResetKpiModel}
        />
      </Col>
    </Row>
  );
}

ResetMetricOptionsEditorPanel.propTypes = {
  resetKpiModel: PropTypes.object,
  setResetKpiModel: PropTypes.func,
};

export default ResetMetricOptionsEditorPanel;


