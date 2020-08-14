import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "./table";

// Note: I only made this because we have a lot of areas where we need to use the name/value tables so might as well reuse this.
function NameValueTable({ tableStyleName, data, noDataMessage, label }) {

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ],
    []
  );

  const parseEmptyRows = (data) => {
    let parsedRows = [];
    if (data && data.length > 0)
    {
      data.map((row, index) => {
        if (row["name"] || row["value"]) {
          parsedRows.push(row);
        }
      });
    }

    return parsedRows;
  };

  return (
    <>
      <div className="text-center pb-1"><span className="text-muted">{label}</span></div>
      <div className="table-content-block mb-3">
        <CustomTable
          tableStyleName={tableStyleName}
          columns={columns}
          data={parseEmptyRows(data)}
          noDataMessage={noDataMessage}
        />
      </div>
    </>
  );
}

// TODO: Accept field instead of label
NameValueTable.propTypes = {
  tableStyleName: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  noDataMessage: PropTypes.string
};

NameValueTable.defaultProps = {
  tableStyleName: "custom-table-2"
}

export default NameValueTable;