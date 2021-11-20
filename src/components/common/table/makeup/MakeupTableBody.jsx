import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import MakeupTableRow from "components/common/table/makeup/MakeupTableRow";

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

  const getTableRows = () => {
    if (isLoading && (!Array.isArray(rows) || rows.length === 0)) {
      return (
        <tr>
          <td
            colSpan="100%"
            className="info-text text-center p-3"
          >
            <div className="row" style={{ height:"150px", width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><IconBase isLoading={true} className="mr-2 mt-1"/>Loading Data</span>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    if (!isLoading && (!Array.isArray(rows) || rows.length === 0)) {
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