import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import PropTypes from "prop-types";
import MakeupTableBody from "components/common/table/makeup/MakeupTableBody";
import MakeupTableHeader from "components/common/table/makeup/MakeupTableHeader";
import { hasStringValue } from "components/common/helpers/string-helpers";

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
    selectedModel,
    tableHeight,
  }) {

  const table = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy,
    usePagination
  );

  const getBodyStyling = () => {
    if (hasStringValue(tableHeight) === true) {
      return ({
        minHeight: tableHeight,
        height: tableHeight,
        maxHeight: tableHeight,
        overflowY: "scroll",
      });
    }
  };

  const bodyStyling = getBodyStyling();
  if (table == null) {
    return null;
  }

  return (
    <div
      className={className}
      style={bodyStyling}
    >
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
          totalColumnsWidth={table?.totalColumnsWidth}
          selectedModel={selectedModel}
          tableHeight={tableHeight}
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
  selectedModel: PropTypes.object,
  tableHeight: PropTypes.string,
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