import React from "react";
import PropTypes from "prop-types";
import "dhx-suite-package/codebase/suite.css";
import TableBase from "components/common/table/TableBase";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

function VanityTable({ columns, loadData, data, noDataMessage, onRowSelect, rowStyling, isLoading, sort, paginationModel, setPaginationModel }) {
  const getTableBody = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={paginationModel}
        setFilterDto={setPaginationModel}
      >
        <TableBase
          noDataMessage={noDataMessage}
          data={data}
          isLoading={isLoading}
          columns={columns}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          sort={sort}
        />
      </PaginationContainer>
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
    />
  );
}

VanityTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  sort: PropTypes.string,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  loadData: PropTypes.func
};

export default VanityTable;