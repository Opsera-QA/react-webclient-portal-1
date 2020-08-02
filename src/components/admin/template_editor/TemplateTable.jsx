import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTable from "components/common/table/table";
import { format } from "date-fns";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function TemplateTable({ data, selectedRow }) {
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };  

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
        class: "cell-center no-wrap-inline"
      },
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Active",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
      },
    ],
    []
  );

  const noDataMessage = "No templates are currently available";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        onRowSelect={selectedRow}
        noDataMessage={noDataMessage}
        rowStyling={rowStyling}
        initialState={initialState}
      >
      </CustomTable>
    </>
  );
}

TemplateTable.propTypes = {
  data: PropTypes.array,
  selectedRow: PropTypes.func
};

export default TemplateTable;