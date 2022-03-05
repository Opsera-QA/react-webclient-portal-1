import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  getTableDateColumn,
  getTableTextColumn,
  getOwnerNameField
} from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faFileArchive} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";

function PipelineStorageTable({ data, loadData, isLoading, pipelineStoragePaginationModel, setPipelineStoragePaginationModel, pipelineStorageMetadata, isMounted }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(pipelineStorageMetadata);
  }, [JSON.stringify(pipelineStorageMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (isMounted?.current === true && newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "pipelineName")),
          getTableTextColumn(getField(fields, "stepId")),
          getTableTextColumn(getField(fields, "dataType")),
          getOwnerNameField(),
          getTableDateColumn(getField(fields, "createdAt")),
        ]
      );
    }
  };

  const onRowSelect = (rowData, row) => {
    history.push(`/admin/pipeline-storage/details/${row?._id}`);
  };

  const getPipelineStorageTable = () => {
    return (
      <VanityTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={data}
        columns={columns}
        loadData={loadData}
        // paginationModel={pipelineStoragePaginationModel}
        // setPaginationModel={setPipelineStoragePaginationModel}
        noDataMessage={"No Pipeline Storage records have been created yet"}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getPipelineStorageTable()}
      titleIcon={faFileArchive}
      title={"Pipeline Storage Records"}
      className={"px-2 pb-2"}
      filterDto={pipelineStoragePaginationModel}
      setFilterDto={setPipelineStoragePaginationModel}
    />
  );
}

PipelineStorageTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  pipelineStoragePaginationModel: PropTypes.object,
  setPipelineStoragePaginationModel: PropTypes.func,
  pipelineStorageMetadata: PropTypes.object,
  isMounted: PropTypes.object
};

export default PipelineStorageTable;
