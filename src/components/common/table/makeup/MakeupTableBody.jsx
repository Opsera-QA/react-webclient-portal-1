import React from "react";
import PropTypes from "prop-types";
import MakeupTableRow from "components/common/table/makeup/MakeupTableRow";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
// import { hasStringValue } from "components/common/helpers/string-helpers";
// import { FixedSizeList } from "react-window";
// TODO: When we implement the static header, we need to install"react-window": "^1.8.7",


function MakeupTableBody(
  {
    prepareRow,
    getTableBodyProps,
    rows,
    columns,
    noDataMessage,
    onRowSelect,
    rowStyling,
    isLoading,
    selectedModel,
    totalColumnsWidth,
    tableHeight,
  }) {
  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      return (
        <MakeupTableRow
          row={row}
          rowStyling={rowStyling}
          onRowSelect={onRowSelect}
          columns={columns}
          prepareRow={prepareRow}
          index={index}
          key={index}
          selectedModel={selectedModel}
        />
      );
    },
    [prepareRow, rows]
  );


  const getTableRows = () => {
    if (isLoading && (!Array.isArray(rows) || rows.length === 0)) {
      return (
        <tr>
          <td colSpan={12}>
            <CenterLoadingIndicator minHeight={tableHeight ? tableHeight : "500px"} />
          </td>
        </tr>
      );
    }

    if (!isLoading && (!Array.isArray(rows) || rows.length === 0)) {
      return (
        <tr>
          <td
            colSpan={12}
            className={"info-text text-center p-5"}
          >
            {noDataMessage}
          </td>
        </tr>
      );
    }

    // TODO: Evaluate using fixed size list for keeping the header static
    // if (hasStringValue(tableHeight) === true) {
    //   return (
    //     <FixedSizeList
    //       height={400}
    //       itemCount={rows?.length}
    //       itemSize={35}
    //       width={totalColumnsWidth + 20}
    //     >
    //       <RenderRow />
    //     </FixedSizeList>
    //   );
    // }

    // TODO: Replace with RenderRow once determined safe
    return (
      rows.map((row, i) => {
        return (
          <MakeupTableRow
            row={row}
            rowStyling={rowStyling}
            onRowSelect={onRowSelect}
            columns={columns}
            prepareRow={prepareRow}
            index={i}
            key={i}
            selectedModel={selectedModel}
          />
        );
      })
    );
  };

  return (
    <tbody
      {...getTableBodyProps()}
    >
      {getTableRows()}
    </tbody>
  );
}

MakeupTableBody.propTypes = {
  prepareRow: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  columns: PropTypes.array,
  rows: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedModel: PropTypes.object,
  tableHeight: PropTypes.string,
  totalColumnsWidth: PropTypes.any,
};

MakeupTableBody.defaultProps = {
  rows: [],
  noDataMessage: "No data is currently available",
};

export default MakeupTableBody;