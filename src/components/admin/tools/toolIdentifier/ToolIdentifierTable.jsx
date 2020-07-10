import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import CustomTable from "components/common/table";

function ToolIdentifierTable({ data, selectedRow }) {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },     
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return props.value ? format(new Date(props.value), "yyyy-MM-dd") : "";
        },
        class: "cell-center"
      },
    ],
    []
  );

  const noDataMessage = "No tools are currently registered";

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };  

  const rowStyling = (row) => {
  };

  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        initialState={initialState}
        selectedRow={selectedRow}
        // tableFilter={filterOption}
        // paginationOptions={paginationOptions}
      >
      </CustomTable>
    </>
  );
}

ToolIdentifierTable.propTypes = {
  data: PropTypes.array,
  selectedRow: PropTypes.func
};

export default ToolIdentifierTable;