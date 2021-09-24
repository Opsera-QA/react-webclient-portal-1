import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getTableDateColumn} from "../../../common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";

function ToolPipelinesTable({ pipelineData, isLoading, loadData, toolModel }) {
  const fields = pipelineSummaryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt";})),
    ],
    []
  );

  const getPipelinesTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={pipelineData}
        isLoading={isLoading}
        noDataMessage={"This tool is not used by any pipelines."}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      loadData={loadData}
      isLoading={isLoading}
      metadata={pipelineSummaryMetadata}
      type={"Pipeline"}
      body={getPipelinesTable()}
      titleIcon={faDraftingCompass}
      title={`Pipelines Used By ${toolModel?.getData("name")}`}
    />
  );
}

ToolPipelinesTable.propTypes = {
  pipelineData: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  toolModel: PropTypes.object,
};

export default ToolPipelinesTable;