import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function DataMappingSummary({ projectMappingDto, setProjectMappingData, setActiveTab }) {

  if (projectMappingDto === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={projectMappingDto} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={projectMappingDto} fieldName={"tool_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={projectMappingDto} fieldName={"key"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={projectMappingDto} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TagField dataObject={projectMappingDto} fieldName={"value"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={projectMappingDto} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

DataMappingSummary.propTypes = {
  projectMappingDto: PropTypes.object,
  setProjectMappingData: PropTypes.func,
  setActiveTab: PropTypes.func
};


export default DataMappingSummary;
