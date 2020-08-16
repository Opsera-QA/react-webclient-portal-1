import React, {useContext} from "react";
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
import {useHistory} from "react-router-dom";
import templateActions from "../template-actions";
import DtoJsonField from "../../../common/form_fields/dto_form_fields/dto-json-field";
import DtoItemDisplayer from "../../../common/input/dto_input/item-displayer/dto-item-displayer";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";

function TemplateSummaryPanel({templateData, setTemplateData}) {
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();

  const handleActiveToggle = async () => {
    if(templateData.isModelValid()) {
      try {
        let newTemplateData = {...templateData};
        newTemplateData.setData("active", !newTemplateData.getData("active"));
        let response = await templateActions.updateTemplate({...newTemplateData}, getAccessToken);
        let updatedDto = new Model(response.data, templateData.metaData, false);
        setTemplateData(updatedDto);
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
    history.push("/admin/templates");
  }

  return (
    <>
      {templateData && <>
        <div className="scroll-y pt-2 px-3">
          <SummaryActionBar handleBackButton={handleBackButton} handleActiveToggle={handleActiveToggle}
                            status={templateData.getData("active")}/>
          <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
            <Row>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"name"}/>
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"description"}/>
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"account"}/>
              </Col>
              <Col lg={6}>
                <DtoDateField dataObject={templateData} fieldName={"createdAt"}/>
              </Col>
              <Col lg={6}>
                <DtoTextField dataObject={templateData} fieldName={"_id"}/>
              </Col>
              <Col lg={6}>
                <DtoToggleField dataObject={templateData} fieldName={"active"}/>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <DtoItemField dataObject={templateData} fieldName={"tags"} />
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
      </>}
    </>
  );
}

TemplateSummaryPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};


export default TemplateSummaryPanel;
