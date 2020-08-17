import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import DtoTextField from "../../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../../common/form_fields/dto_form_fields/dto-date-field";
import DtoToggleField from "../../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoItemField from "../../../../common/form_fields/dto_form_fields/dto-item-field";
import SummaryActionBar from "../../../../common/actions/SummaryActionBar";
import Model from "../../../../../core/data_model/model";
import {AuthContext} from "../../../../../contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import toolTypeActions from "../../tool-management-actions";
import DtoPropertiesField from "../../../../common/form_fields/dto_form_fields/dto-properties-field";

function ToolIdentifierSummaryPanel({toolIdentifierData, setToolIdentifierData}) {
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();

  const handleActiveToggle = async () => {
    if(toolIdentifierData.isModelValid()) {
      try {
        let newToolIdentifierData = {...toolIdentifierData};
        newToolIdentifierData.setData("active", !newToolIdentifierData.getData("active"));
        let response = await toolTypeActions.updateToolIdentifier({...newToolIdentifierData}, getAccessToken);
        let updatedDto = new Model(response.data, toolIdentifierData.metaData, false);
        setToolIdentifierData(updatedDto);
        // let toast = getPersistToast(true, "update", "User", undefined, setShowToast);
        // setToast(toast);
        // setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleBackButton = () => {
    history.push("/admin/tools/identifiers");
  }

  return (
    <>
      {toolIdentifierData &&
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar handleBackButton={handleBackButton} handleActiveToggle={handleActiveToggle}
                          status={toolIdentifierData.getData("active")}/>
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"description"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"tool_type_identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={toolIdentifierData} fieldName={"createdAt"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"_id"}/>
            </Col>
            <Col lg={6}>
              <DtoToggleField dataObject={toolIdentifierData} fieldName={"active"}/>
            </Col>
            <Col lg={12}>
              <DtoItemField dataObject={toolIdentifierData} fieldName={"tags"}/>
            </Col>
            <Col lg={6}>
              <DtoPropertiesField dataObject={toolIdentifierData} fieldName={"properties"}/>
            </Col>
          </Row>
        </div>
      </div>}
    </>
  );
}

ToolIdentifierSummaryPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func
};


export default ToolIdentifierSummaryPanel;
