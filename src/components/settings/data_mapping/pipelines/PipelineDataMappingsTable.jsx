import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import NewProjectDataMappingOverlay from "components/settings/data_mapping/projects/NewProjectDataMappingOverlay";
import {
  getTableBooleanIconColumn,
  getTableTextColumn, getTagColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";
import NewPipelineDataMappingOverlay from "components/settings/data_mapping/pipelines/NewPipelineDataMappingOverlay";

function PipelineDataMappingsTable(
  {
    pipelineDataMappings,
    loadData,
    isLoading,
    isMounted,
    pipelineDataMappingMetadata,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata();
  }, [pipelineDataMappingMetadata]);

  const loadColumnMetadata = () => {
    if (isMounted?.current === true && Array.isArray(pipelineDataMappingMetadata?.fields)) {
      const fields = pipelineDataMappingMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields,"name")),
          getTableTextColumn(getField(fields,"description")),
          getTableTextColumn(getField(fields,"externalId")),
        ]
      );
    }
  };

  const selectedRow = (rowData) => {
    history.push(`/settings/data_mapping/pipeline/details/${rowData.original._id}`);
  };

  const noDataMessage = "No Pipeline Data Mappings have been configured";

  const createProjectTag = () => {
    toastContext.showOverlayPanel(
      <NewPipelineDataMappingOverlay
        loadData={loadData}
        isMounted={isMounted}
        pipelineDataMappingMetadata={pipelineDataMappingMetadata}
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
  pipelineDataMappingMetadata: PropTypes.object,
};

export default PipelineDataMappingsTable;
