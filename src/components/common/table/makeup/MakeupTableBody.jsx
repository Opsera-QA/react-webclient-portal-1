import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MakeupTableRow from "components/common/table/makeup/MakeupTableRow";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

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
  }) {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    setTableRows(rows);
  }, []);

  useEffect(() => {
    setTableRows(rows);
  }, [rows]);

  const getTableRows = () => {
    if (isLoading && (!Array.isArray(tableRows) || tableRows.length === 0)) {
      return (
        <tr>
          <td colSpan="100%">
            <div style={{height: "500px"}}>
              <CenterLoadingIndicator />
            </div>
          </td>
        </tr>
      );
    }

    if (!isLoading && (!Array.isArray(tableRows) || tableRows.length === 0)) {
      return (
        <tr>
          <td
            colSpan="100%"
            className="info-text text-center p-5"
          >
            {noDataMessage}
          </td>
        </tr>
      );
    }

    return (
      tableRows.map((row, i) => {
        return (
          <MakeupTableRow
            row={row}
            rowStyling={rowStyling}
            onRowSelect={onRowSelect}
            columns={columns}
            prepareRow={prepareRow}
            index={i}
            key={i}
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
};

MakeupTableBody.defaultProps = {
  rows: [],
  noDataMessage: "No data is currently available",
};

export default MakeupTableBody;