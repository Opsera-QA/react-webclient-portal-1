import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function DataMappingSummary({ userDataMappingModel, setActiveTab }) {

  if (userDataMappingModel === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <ToolNameField model={userDataMappingModel} fieldName={"tool_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"tool_user_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"tool_user_email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"opsera_user_email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userDataMappingModel} fieldName={"tool_user_prop"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={userDataMappingModel} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

DataMappingSummary.propTypes = {
  userDataMappingModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default DataMappingSummary;
