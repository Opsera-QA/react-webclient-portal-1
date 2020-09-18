import React, {useContext, useState} from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import Model from "../../../../core/data_model/model";
import {AuthContext} from "../../../../contexts/AuthContext";
import templateActions from "../template-actions";
import DtoJsonField from "../../../common/form_fields/dto_form_fields/dto-json-field";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";
import DtoTagField from "../../../common/form_fields/dto_form_fields/dto-tag-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function TemplateSummaryPanel({templateData, setTemplateData}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  const handleActiveToggle = async () => {
    if(templateData.isModelValid2()) {
      try {
        let newTemplateData = {...templateData};
        newTemplateData.setData("active", !newTemplateData.getData("active"));
        let response = await templateActions.updateTemplate({...newTemplateData}, getAccessToken);
        let updatedDto = new Model(response.data, templateData.metaData, false);
        setTemplateData(updatedDto);
        toastContext.showUpdateSuccessResultDialog(newTemplateData.getType());
      } catch (error) {
        toastContext.showUpdateFailureResultDialog(error);
        console.error(error);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };

  if (templateData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
        <div className="scroll-y pt-2 px-3">
          <SummaryActionBar backButtonPath={"/admin/templates"} handleActiveToggle={handleActiveToggle}
                            status={templateData.getData("active")}/>
          <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
            <Row>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"name"}/>
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"_id"}/>
              </Col>
              <Col lg={12}>
                <DtoTextField dataObject={templateData} fieldName={"description"}/>
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"account"}/>
              </Col>
              <Col lg={6}>
                <DtoDateField dataObject={templateData} fieldName={"createdAt"}/>
              </Col>
              <Col lg={6}>
                <DtoToggleField dataObject={templateData} fieldName={"active"}/>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <DtoTagField dataObject={templateData} fieldName={"tags"} />
              </Col>
              <Col lg={4}>
                <DtoItemField dataObject={templateData} fieldName={"type"} />
              </Col>
              <Col lg={4}>
                <DtoItemField dataObject={templateData} fieldName={"roles"} />
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <DtoJsonField dataObject={templateData} fieldName={"plan"} />
              </Col>
            </Row>
          </div>
        </div>
    </>
  );
}

TemplateSummaryPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};


export default TemplateSummaryPanel;
