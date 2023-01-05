import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import ExportTagReportButton from 'components/common/buttons/export/reports/ExportTagReportButton';
import TagsUsedInPipelinesVerticalTabContainer from "./TagsUsedInPipelinesVerticleTabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TagsUsedInPipelineTable({
  data,
  loadData,
  isLoading,
  tags,
  tagsUsedInPipelineDto,
}) {
  const history = useHistory();
  let fields = pipelineSummaryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "description")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    history.push("/workflow/details/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const getTagsTable = () => {
    return (
      <Row className={"mx-0"}>
        <Col
          sm={2}
          className={"px-0 makeup-tree-container"}
        >
          <TagsUsedInPipelinesVerticalTabContainer
            isLoading={isLoading}
            loadData={loadData}
            tags={tags}
            tagsUsedInPipelineDto={tagsUsedInPipelineDto}
          />
        </Col>
        <Col
          sm={10}
          className={"px-0"}
        >
          <CustomTable
            onRowSelect={onRowSelect}
            data={data}
            rowStyling={rowStyling}
            columns={columns}
            isLoading={isLoading}
            loadData={loadData}
          />
        </Col>
      </Row>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      supportSearch={false}
      isLoading={isLoading}
      body={getTagsTable()}
      metadata={pipelineSummaryMetadata}
      titleIcon={faDraftingCompass}
      title={"Pipelines"}
      className={"px-2 pb-2"}
      exportButton={
        <ExportTagReportButton
          className={"ml-2"}
          isLoading={isLoading}
          tagData={data}
        />
      }
    />
  );
}

TagsUsedInPipelineTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagsUsedInPipelineDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
  isMounted: PropTypes.object,
  tags: PropTypes.array,
};

export default TagsUsedInPipelineTable;