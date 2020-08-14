import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";

function JenkinsAccountsTable({ data, selectedRow }) {

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "service",
        desc: false
      }
    ]
  };

  const columns = useMemo(
    () => [
      {
        Header: "Service",
        accessor: "service",
      },
      {
        Header: "Tool Id",
        accessor: "toolId",
      },
      {
        Header: "Git User Name",
        accessor: "gitUserName"
      },      
      {
        Header: "Git Credential",
        accessor: "gitCredential"
      },        
    ],
    []
  );

  return (
    <>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          initialState={initialState}
          onRowSelect={selectedRow}
          tableStyleName={"custom-table-2"}
        >
        </CustomTable>
      </div>
    </>
  );
}

JenkinsAccountsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func,
  selectedRow: PropTypes.func
};

export default JenkinsAccountsTable;