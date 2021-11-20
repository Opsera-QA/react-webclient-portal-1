import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import MakeupTableBody from "components/common/table/makeup/MakeupTableBody";
import MakeupTableHeader from "components/common/table/makeup/MakeupTableHeader";

export const defaultInitialState = {
  pageIndex: 0
};

function MakeupTableBase(
  {
    className,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    initialState,
    isLoading,
  }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy,
    usePagination
  );

  return (
    <div className={className}>
      <table className={"custom-table"} responsive="true" hover="true" {...getTableProps()}>
        <MakeupTableHeader
          isLoading={isLoading}
          data={data}
          headerGroups={headerGroups}
        />
        <MakeupTableBody
          isLoading={isLoading}
          noDataMessage={noDataMessage}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          columns={columns}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          rows={rows}
        />
      </table>
    </div>
  );
}

MakeupTableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  initialState: PropTypes.object,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

MakeupTableBase.defaultProps = {
  initialState: defaultInitialState,
  data: [],
  isLoading: false,
  noDataMessage: "No data is currently available",
  className: "table-content-block",
  scrollOnLoad: true
};

export default MakeupTableBase;