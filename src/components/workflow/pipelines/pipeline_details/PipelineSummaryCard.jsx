import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import LoadingDialog from "../../../common/status_notifications/loading";
import TextField from "../../../common/form_fields/text-field";
import {format} from "date-fns";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiceD20} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import PipelineSummaryField from "../../../common/form_fields/dto_form_fields/PipelineSummaryField";

function PipelineSummaryCard({ pipelineData }) {
  if (pipelineData == null) {
    return <LoadingDialog size="sm" />;
  }

  // TODO: Refactor when dealing with nested objects is improved, style
  return (
    <div className="mx-2">
      <Link to={`/workflow/details/${pipelineData.getData("_id")}`}>
        <span><FontAwesomeIcon icon={faDiceD20} className="pr-1"/>View Or Edit this Pipeline&apos;s settings</span>
      </Link>
      <DtoTextField dataObject={pipelineData} fieldName={"name"}/>
      <PipelineSummaryField pipelineData={pipelineData}/>
      <TextField label={"Run Count"} value={pipelineData.getPersistData()?.workflow?.last_run?.run_count + ""}/>
      <DtoTextField dataObject={pipelineData} fieldName={"owner_name"}/>
      <DtoDateField dataObject={pipelineData} fieldName={"createdAt"}/>
    </div>
  );
}

PipelineSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
};


export default PipelineSummaryCard;
