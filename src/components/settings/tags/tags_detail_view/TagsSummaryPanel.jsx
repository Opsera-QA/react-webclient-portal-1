import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import NameValueTable from "../../../common/table/nameValueTable";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoToggleField from "../../../common/form_fields/dto_form_fields/dto-toggle-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function TagsSummaryPanel({ tagData }) {
  const parseNameValueArray = (nameValueArray) => {
    let parsedValues = [];

    if (nameValueArray != null) {
      for (const key of Object.keys(nameValueArray)) {
        if (key != null) {
          parsedValues.push({ name: key, value: nameValueArray[key] });
        }
      }
    }

    return parsedValues;
  };

  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={tagData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={tagData} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={tagData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={tagData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={tagData} fieldName={"value"}/>
        </Col>
        <Col lg={6}>
          <DtoToggleField dataObject={tagData} fieldName={"active"}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mt-3">
            <NameValueTable label="Configuration"
                            data={parseNameValueArray(tagData.configuration)}
                            noDataMessage="No configurations are assigned to this tag."/>
          </div>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TagsSummaryPanel.propTypes = {
  tagData: PropTypes.object,
};


export default TagsSummaryPanel;
