import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../../common/form_fields/dto_form_fields/dto-item-field";
import Model from "../../../../../core/data_model/model";
import {AuthContext} from "../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import projectTagsMetadata from "../tagging-project-metadata";
import DtoJsonField from "../../../../common/form_fields/dto_form_fields/dto-json-field";
import dataMappingActions from "../../data-mapping-actions";
import DtoTagField from "../../../../common/form_fields/dto_form_fields/dto-tag-field";

function DataMappingSummary({ projectMappingDto, setProjectMappingData, setActiveTab }) {

  if (projectMappingDto === null) {
    return <LoadingDialog size="sm" />
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={projectMappingDto} fieldName={"tool_identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={projectMappingDto} fieldName={"tool_id"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={projectMappingDto} fieldName={"key"}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField dataObject={projectMappingDto} fieldName={"active"}/>
            </Col>
            <Col lg={6}>
              <DtoTagField dataObject={projectMappingDto} fieldName={"value"} />
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={projectMappingDto} fieldName={"createdAt"}/>
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
