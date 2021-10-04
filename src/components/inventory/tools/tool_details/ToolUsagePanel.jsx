import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import ToolUsedInPipelinesField from "../../../common/fields/inventory/ToolUsedInPipelinesField";

function ToolUsagePanel({ toolData }) {
  return (
    <DetailPanelContainer>
      <Row>
        <Col lg={12}>
          <ToolUsedInPipelinesField dataObject={toolData} />
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

ToolUsagePanel.propTypes = {
  toolData: PropTypes.object,
};

export default ToolUsagePanel;
