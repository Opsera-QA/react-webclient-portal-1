import React, {useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import {axiosApiService} from "../../../../api/apiService";
import {AuthContext} from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import DtoTagField from "../../../common/form_fields/dto_form_fields/dto-tag-field";

function ToolSummaryPanel({ toolData, setToolData }) {
  const { getAccessToken } = useContext(AuthContext);

  const toggleToolType = async () => {
    if(toolData.isModelValid()) {
      try {
        let newToolData = toolData.getPersistData();
        newToolData["active"] = !newToolData["active"];
        let response = await axiosApiService(getAccessToken).post(`/registry/${newToolData._id}/update`, newToolData);
        let updatedDto = new Model(response.data, toolData.metaData, false);
        setToolData(updatedDto);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <>{ toolData && <>
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar backButtonPath={"/inventory/tools"} handleActiveToggle={toggleToolType} status={toolData.getData("active")} />
        <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
          <Row>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"name"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"tool_identifier"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"tool_type_identifier"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"_id"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"account"} />
            </Col>
            <Col lg={6}>
              <DtoDateField dataObject={toolData} fieldName={"createdAt"} />
            </Col>
            <Col lg={6}>
              <DtoTextField dataObject={toolData} fieldName={"description"} />
            </Col>
            <Col lg={6}>
              <DtoTagField dataObject={toolData} fieldName={"tags"} />
            </Col>
          </Row>
        </div>
      </div>
      </>}
    </>
  );
}

ToolSummaryPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func
}

export default ToolSummaryPanel;
