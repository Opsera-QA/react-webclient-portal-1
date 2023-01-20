import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import ToolUsedInPipelinesField from "../../../common/fields/inventory/ToolUsedInPipelinesField";
import NotificationUsedInPipelineField from "components/common/fields/inventory/NotificationUsedInPipelineField";
import { ORCHESTRATION_NOTIFICATION_TYPES } from "components/common/fields/notifications/notificationTypes.constants";

function ToolUsagePanel(
  {
    toolData,
    closePanelFunction,
  }) {
  const getUsedInPipelinesField = (toolIdentifier) => {
    if (toolIdentifier === ORCHESTRATION_NOTIFICATION_TYPES.SLACK || 
      toolIdentifier === ORCHESTRATION_NOTIFICATION_TYPES.TEAMS || 
      toolIdentifier === ORCHESTRATION_NOTIFICATION_TYPES.SERVICE_NOW || 
      toolIdentifier === ORCHESTRATION_NOTIFICATION_TYPES.JIRA || 
      toolIdentifier === ORCHESTRATION_NOTIFICATION_TYPES.GCHAT
    ){
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
