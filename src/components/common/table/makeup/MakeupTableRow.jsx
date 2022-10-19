import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

function MakeupTableRow(
  {
    prepareRow,
    columns,
    onRowSelect,
    rowStyling,
    index,
    row,
    selectedModel,
  }) {
  const [rowClassNames, setRowClassNames] = useState("table-row");

  useEffect(() => {
    setRowClassNames(getRowClassNames());
  }, [selectedModel]);

  const setColumnClass = (id, columnDefinitions) => {
    let response = "";
    if (columnDefinitions && id){
      Object.keys(columnDefinitions).forEach(function(key) {
        if (columnDefinitions[key].accessor === id && columnDefinitions[key].class != null) {
          response = columnDefinitions[key].class;
        }      
      });      
    } 
    return response;
  };

  const getRowClassNames = () => {
    let rowClassNames = "table-row";
    rowClassNames += onRowSelect ? " pointer" : "";
    const rowStylingString = rowStyling ? rowStyling(row) : "";

    if (hasStringValue(rowStylingString) === true) {
      rowClassNames += hasStringValue(rowClassNames) ? ` ${rowStylingString}` : rowStylingString;
    }

    return rowClassNames;
  };

  prepareRow(row);
  return (
    <tr
      className={rowClassNames}
      {...row.getRowProps({onClick: () => onRowSelect ? onRowSelect(row) : null})}
    >
      {row.cells.map((cell, j) => {
        return (
          <td
            key={j}
            {...cell.getCellProps()}
            className={"table-cell px-2 py-1 " + setColumnClass(cell.column.id, columns)}
          >
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
}

MakeupTableRow.propTypes = {
  prepareRow: PropTypes.func,
  columns: PropTypes.array,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  index: PropTypes.number,
  row: PropTypes.object,
  selectedModel: PropTypes.object,
};

export default MakeupTableRow;