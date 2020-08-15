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

  const contactsColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "value",
      },
      {
        Header: "ID",
        accessor: "user_id",
      },
    ],
    []
  );

  const getTable = (data, tableColumns, object) => {
    return (
      <>
        <div className="text-center pb-1"><span className="text-muted">{object}</span></div>
        <div className="table-content-block mb-3">
          <CustomTable
            columns={tableColumns}
            data={parseEmptyRows(data)}
            noDataMessage={"No " + object + " are assigned to this tool."}
            tableStyleName="custom-table-2"
          >
          </CustomTable>
        </div>
      </>
    );
  };

  const parseEmptyRows = (data) => {
    let parsedRows = [];

    if (data && data.length > 0)
    {
      data.map((row, index) => {
        if (row["name"] || row["value"]) {
          parsedRows.push(row);
        }
      });
    }

    return parsedRows;
  };

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
            <Col lg={6}>
              <NameValueTable data={toolData["licensing"]} label={toolData.getFieldById("licensing").label} />
            </Col>
            <Col lg={6}>
              <NameValueTable data={toolData["compliance"]} label={toolData.getFieldById("compliance").label} />
            </Col>
            <Col lg={6}>
              <NameValueTable data={toolData["location"]} label={toolData.getFieldById("location").label} />
            </Col>
            <Col lg={6}>
              <NameValueTable data={toolData["projects"]} label={toolData.getFieldById("projects").label} />
            </Col>
            <Col lg={6}>
              {getTable(toolData["contacts"], contactsColumns, "Contacts")}
            </Col>
            <Col lg={6}>
              <NameValueTable data={toolData["applications"]} label={toolData.getFieldById("applications").label} />
            </Col>
            <Col lg={6}>
              <NameValueTable data={toolData["organization"]} label={toolData.getFieldById("organization").label} />
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
