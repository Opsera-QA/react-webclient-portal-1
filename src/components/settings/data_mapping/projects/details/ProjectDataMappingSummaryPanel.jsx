import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";
import ExternalToolPropertyCacheField from "components/common/fields/cache/ExternalToolPropertyCacheField";

function ProjectDataMappingSummaryPanel(
  {
    projectDataMappingModel,
    setActiveTab,
  }) {

  if (projectDataMappingModel === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer
      setActiveTab={projectDataMappingModel?.canUpdate() === true ? setActiveTab : undefined}
    >
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={projectDataMappingModel} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={projectDataMappingModel} fieldName={"tool_id"}/>
        </Col>
        <Col lg={6}>
          <ExternalToolPropertyCacheField
            model={projectDataMappingModel}
            fieldName={"key"}
            toolIdFieldName={"tool_id"}
          />
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={projectDataMappingModel} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={projectDataMappingModel} fieldName={"value"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={projectDataMappingModel} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ProjectDataMappingSummaryPanel.propTypes = {
  projectDataMappingModel: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default ProjectDataMappingSummaryPanel;
