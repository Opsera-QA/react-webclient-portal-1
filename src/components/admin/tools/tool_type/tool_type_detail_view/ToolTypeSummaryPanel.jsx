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
import toolTypeActions from "../../tool-management-actions";
import LoadingDialog from "../../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";

function ToolTypeSummaryPanel({ toolTypeData, setToolTypeData, setActiveTab }) {
  const { getAccessToken } = useContext(AuthContext);

  const handleActiveToggle = async () => {
    if(toolTypeData.isModelValid()) {
      try {
        let newToolTypeData = {...toolTypeData};
        newToolTypeData.setData("active", !newToolTypeData.getData("active"));
        let response = await toolTypeActions.updateToolType({...newToolTypeData}, getAccessToken);
        let updatedDto = new Model(response.data, toolTypeData.metaData, false);
        setToolTypeData(updatedDto);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  if (toolTypeData == null) {
    return <LoadingDialog size="sm" />
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={toolTypeData} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolTypeData} fieldName={"description"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolTypeData} fieldName={"_id"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolTypeData} fieldName={"identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={toolTypeData} fieldName={"createdAt"}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField dataObject={toolTypeData} fieldName={"active"}/>
            </Col>
            <Col lg={12}>
              <DtoItemField dataObject={toolTypeData} fieldName={"tags"}/>
            </Col>
          </Row>
    </SummaryPanelContainer>
  );
}

ToolTypeSummaryPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  setActiveTab: PropTypes.func
};


export default ToolTypeSummaryPanel;
