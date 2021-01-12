import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";

function DataMappingSummary({ usersMappingDto, setUsersMappingData, setActiveTab }) {

  if (usersMappingDto === null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"tool_identifier"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"tool_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"tool_user_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"tool_user_email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"opsera_user_email"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={usersMappingDto} fieldName={"tool_user_prop"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={usersMappingDto} fieldName={"createdAt"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

DataMappingSummary.propTypes = {
  usersMappingDto: PropTypes.object,
  setUsersMappingData: PropTypes.func,
  setActiveTab: PropTypes.func,
};

export default DataMappingSummary;
