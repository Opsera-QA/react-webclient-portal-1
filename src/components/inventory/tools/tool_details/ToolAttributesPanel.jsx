import React, {useMemo} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NameValueTable from "components/common/table/nameValueTable";
import DtoTagField from "components/common/form_fields/dto_form_fields/dto-tag-field";
import DtoTextField from "components/common/form_fields/dto_form_fields/dto-text-field";

function ToolAttributesPanel({ toolData }) {
  const contactsColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
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
            showHeaderText={false}
            columns={tableColumns}
            data={parseEmptyRows(data)}
            noDataMessage={"No " + object + " are assigned to this tool."}
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

  return (
    <>{toolData && <>
      <div className="scroll-y pt-2 px-3">
        <Row>
          <Col lg={6}>
            <DtoTagField dataObject={toolData} fieldName={"tags"} />
          </Col>
          <Col lg={6}>
            <DtoTextField dataObject={toolData} fieldName={"costCenter"} />
          </Col>
          <Col lg={6}>
            <NameValueTable data={toolData["licensing"]} label={toolData.getFieldById("licensing").label}/>
          </Col>
          <Col lg={6}>
            <NameValueTable data={toolData["compliance"]} label={toolData.getFieldById("compliance").label}/>
          </Col>
          <Col lg={6}>
            <NameValueTable data={toolData["location"]} label={toolData.getFieldById("location").label}/>
          </Col>
          <Col lg={6}>
            <NameValueTable data={toolData["applications"]} label={toolData.getFieldById("applications").label}/>
          </Col>
          <Col lg={6}>
            <NameValueTable data={toolData["organization"]} label={toolData.getFieldById("organization").label}/>
          </Col>
          <Col lg={6}>
            {getTable(toolData["contacts"], contactsColumns, "Contacts")}
          </Col>
        </Row>
      </div>
    </>}
    </>
  );
}

ToolAttributesPanel.propTypes = {
  toolData: PropTypes.object,
}

export default ToolAttributesPanel;
