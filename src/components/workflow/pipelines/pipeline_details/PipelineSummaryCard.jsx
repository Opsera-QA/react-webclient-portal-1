import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import TextField from "../../../common/form_fields/text-field";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiceD20} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import PipelineSummaryField from "../../../common/form_fields/dto_form_fields/PipelineSummaryField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PipelineSummaryCard({ pipelineData, runCount }) {
  if (pipelineData == null) {
    return <LoadingDialog size="sm" />;
  }

  // TODO: Refactor when dealing with nested objects is improved, style
  return (
    <div className="ml-1">
      <Link to={`/workflow/details/${pipelineData.getData("_id")}`}>
        <span><FontAwesomeIcon icon={faDiceD20} className="pr-1"/>View Or Edit this Pipeline&apos;s settings</span>
      </Link>
      <Row>
        <Col md={6}>
          <DtoTextField dataObject={pipelineData} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <DtoTextField dataObject={pipelineData} fieldName={"owner_name"}/>
        </Col>
        <Col md={6}>
          <TextField label={"Run Count"} value={runCount }/>
        </Col>
        <Col md={6}>
          <DtoDateField dataObject={pipelineData} fieldName={"createdAt"}/>
        </Col>
        <Col md={12}>
          <PipelineSummaryField pipelineData={pipelineData}/>
        </Col>
      </Row>
    </div>
  );
}

PipelineSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  runCount: PropTypes.string
};


export default PipelineSummaryCard;
