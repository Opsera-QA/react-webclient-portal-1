import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";
import NewPipelineDataMappingOverlay from "components/settings/data_mapping/pipelines/NewPipelineDataMappingOverlay";
import pipelineDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/pipeline/pipelineDataMapping.metadata";
import {
  analyticsPipelineDataMappingHelper
} from "components/settings/data_mapping/pipelines/analyticsPipelineDataMapping.helper";

function PipelineDataMappingsTable(
  {
    pipelineDataMappings,
    loadData,
    isLoading,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = pipelineDataMappingMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields,"name")),
      getTableTextColumn(getField(fields,"description")),
      getTableTextColumn(getField(fields,"externalId")),
    ],
    []
  );

  const selectedRow = (rowData) => {
    history.push(analyticsPipelineDataMappingHelper.getDetailViewLink(rowData.original._id));
  };

  const noDataMessage = "No Pipeline Data Mappings have been configured";

  const createProjectTag = () => {
    toastContext.showOverlayPanel(
      <NewPipelineDataMappingOverlay
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getPipelineTagsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={pipelineDataMappings}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createProjectTag}
      supportSearch={false}
      isLoading={isLoading}
      showBorder={false}
      body={getPipelineTagsTable()}
      metadata={pipelineDataMappingMetadata}
      titleIcon={faDraftingCompass}
      title={"Pipeline Data Mapping Tags"}
      type={"Pipeline Data Mapping Tags"}
      className={"pb-2"}
    />
  );
}

PipelineDataMappingsTable.propTypes = {
  pipelineDataMappings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
};

export default PipelineDataMappingsTable;
