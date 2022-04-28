import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import ToolUsedInPipelinesField from "../../../common/fields/inventory/ToolUsedInPipelinesField";
import NotificationUsedInPipelineField from "components/common/fields/inventory/NotificationUsedInPipelineField";

function ToolUsagePanel(
  {
    toolData,
    closePanelFunction,
  }) {
  const getUsedInPipelinesField = (toolIdentifier) => {
    if (toolIdentifier === "slack" || toolIdentifier === "teams"){
      return (
        <NotificationUsedInPipelineField 
          toolId={toolData?.getData("_id")}
          closePanelFunction={closePanelFunction}
        />
      );
    }
    
    return (
      <ToolUsedInPipelinesField
        toolId={toolData?.getData("_id")}
        closePanelFunction={closePanelFunction}
      />
    );
  };  


  return (
    <DetailPanelContainer>
      <Row>
        <Col lg={12}>
          {getUsedInPipelinesField(toolData?.getData("tool_identifier"))}
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

ToolUsagePanel.propTypes = {
  toolData: PropTypes.object,
  closePanelFunction: PropTypes.func,
};

export default ToolUsagePanel;
