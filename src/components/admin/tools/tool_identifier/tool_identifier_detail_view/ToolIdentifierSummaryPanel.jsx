import React, {useContext, useState} from "react";
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
import toolTypeActions from "../../tool-management-actions";
import DtoPropertiesField from "../../../../common/form_fields/dto_form_fields/dto-properties-field";
import {
  getFormValidationErrorDialog,
  getLoadingErrorDialog,
  getUpdateSuccessResultDialog
} from "../../../../common/toasts/toasts";
import LoadingDialog from "../../../../common/status_notifications/loading";

function ToolIdentifierSummaryPanel({toolIdentifierData, setToolIdentifierData}) {
  const { getAccessToken } = useContext(AuthContext);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleActiveToggle = async () => {
    if(toolIdentifierData.isModelValid()) {
      try {
        let newToolIdentifierData = {...toolIdentifierData};
        newToolIdentifierData.setData("active", !newToolIdentifierData.getData("active"));
        let response = await toolTypeActions.updateToolIdentifier({...newToolIdentifierData}, getAccessToken);
        let updatedDto = new Model(response.data, toolIdentifierData.metaData, false);
        setToolIdentifierData(updatedDto);
        let toast = getUpdateSuccessResultDialog(newToolIdentifierData.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getLoadingErrorDialog(error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  if (toolIdentifierData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <div className="scroll-y pt-2 px-3">
        {showToast && toast}
        <SummaryActionBar backButtonPath={"/admin/tools/identifiers"} handleActiveToggle={handleActiveToggle}
                          status={toolIdentifierData.getData("active")}/>
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"name"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"identifier"}/>
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolIdentifierData} fieldName={"description"}/>
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
      </div>
    </>
  );
}

ToolIdentifierSummaryPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func
};


export default ToolIdentifierSummaryPanel;
