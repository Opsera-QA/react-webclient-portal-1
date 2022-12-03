import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import MakeupTableBase from "components/common/table/makeup/MakeupTableBase";
import TableBase from "components/common/table/TableBase";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

// TODO: Rename ServerSidePaginationMakeupTable when design is complete
function CustomTable(
  {
    className,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    initialState,
    isLoading,
    paginationDto,
    setPaginationDto,
    loadData,
    scrollOnLoad,
    nextGeneration,
    error,
    tableHeight,
  }) {
  const getTableBody = () => {
    return (
      <PaginationContainer
        nextGeneration={nextGeneration}
        isLoading={isLoading}
        filterDto={paginationDto}
        setFilterDto={setPaginationDto}
        loadData={loadData}
        scrollOnLoad={scrollOnLoad}
      >
        <MakeupTableBase
          data={data}
          isLoading={isLoading}
          columns={columns}
          rowStyling={rowStyling}
          onRowSelect={onRowSelect}
          noDataMessage={noDataMessage}
          className={className}
          initialState={initialState}
        />
      </PaginationContainer>
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      noDataMessage={noDataMessage}
      error={error}
      tableComponent={getTableBody()}
      tableHeight={tableHeight}
    />
  );
}

CustomTable.propTypes = {
  tableStyleName: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object,
  isLoading: PropTypes.bool,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  scrollOnLoad: PropTypes.bool,
  nextGeneration: PropTypes.bool,
  tableHeight: PropTypes.string,
  error: PropTypes.any,
};

export default CustomTable;