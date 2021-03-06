import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactJson from "react-json-view";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";

function GitTaskActivityJsonPanel({ gitTaskActivityData }) {
  return (
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          <ReactJson src={gitTaskActivityData} enableClipboard={false} displayDataTypes={false} collapsed={false}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

GitTaskActivityJsonPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default GitTaskActivityJsonPanel;
