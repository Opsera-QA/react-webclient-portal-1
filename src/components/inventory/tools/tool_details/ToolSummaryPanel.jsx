import React, {useContext, useMemo} from "react";
import { Row, Col, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import CustomTable from "components/common/table/table";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryActionBar from "../../../common/actions/SummaryActionBar";
import {axiosApiService} from "../../../../api/apiService";
import {AuthContext} from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import {useHistory} from "react-router-dom";
import NameValueTable from "../../../common/table/nameValueTable";
import TextField from "../../../common/form_fields/text-field";
import DtoItemDisplayer from "../../../common/input/dto_input/item-displayer/dto-item-displayer";
import DtoItemField from "../../../common/form_fields/dto_form_fields/dto-item-field";

function ToolSummaryPanel({ toolData, setToolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const history = useHistory();

  const toggleToolType = async () => {
    if(toolData.isModelValid()) {
      try {
        let newToolData = toolData.getPersistData();
        newToolData["active"] = !newToolData["active"];
        // console.log("toggling active status: " + JSON.stringify(newToolData));
        let response = await axiosApiService(getAccessToken).post(`/registry/${newToolData._id}/update`, newToolData);
        // getToolRegistryItem(toolId);
        // console.log("response: " + JSON.stringify(response));
        let updatedDto = new Model(response.data, toolData.metaData, false);
        setToolData(updatedDto);
        // let toast = getPersistResultDialog(true, "update", "User", undefined, setShowToast);
        // setToast(toast);
        // setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }

  };

  const handleBackButton = () => {
    history.push("/inventory/tools");
  }
  
  return (
    <>{ toolData && <>
      <div className="scroll-y pt-2 px-3">
        <SummaryActionBar handleBackButton={handleBackButton} handleActiveToggle={toggleToolType} status={toolData.getData("active")} />
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
              <DtoItemField dataObject={toolData} fieldName={"tags"} />
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
