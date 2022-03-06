import React, {useEffect, useState} from "react";
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
  const table = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy,
    usePagination
  );

  if (table == null) {
    return null;
  }

  return (
    <div className={className}>
      <table className={"custom-table"} {...table?.getTableProps()}>
        <MakeupTableHeader
          isLoading={isLoading}
          data={data}
          headerGroups={table?.headerGroups}
        />
        <MakeupTableBody
          isLoading={isLoading}
          noDataMessage={noDataMessage}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          columns={columns}
          getTableBodyProps={table?.getTableBodyProps}
          prepareRow={table?.prepareRow}
          rows={table?.rows}
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
  columns: [],
  isLoading: false,
  noDataMessage: "No data is currently available",
  className: "table-content-block",
  scrollOnLoad: true
};

export default MakeupTableBase;