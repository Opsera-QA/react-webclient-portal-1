import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function ChartJsonPanel({ chartModel }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <StandaloneJsonField json={chartModel} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ChartJsonPanel.propTypes = {
  chartModel: PropTypes.object,
};

export default ChartJsonPanel;
