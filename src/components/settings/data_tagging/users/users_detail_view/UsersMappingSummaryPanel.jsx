import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../../common/form_fields/dto_form_fields/dto-item-field";
import Model from "../../../../../core/data_model/model";
import { AuthContext } from "../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import usersTagsMetadata from "../tagging-users-metadata";
import DtoJsonField from "../../../../common/form_fields/dto_form_fields/dto-json-field";
import dataMappingActions from "../../data-mapping-actions";

function DataMappingSummary({ usersMappingDto, setUsersMappingData, setActiveTab }) {

  if (usersMappingDto === null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"tool_identifier"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"tool_id"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"tool_user_id"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"tool_user_email"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"opsera_user_email"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={usersMappingDto} fieldName={"tool_user_prop"} />
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={usersMappingDto} fieldName={"createdAt"} />
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
